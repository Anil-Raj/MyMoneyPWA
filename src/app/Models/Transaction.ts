import Currency from './Currency';
import pick from 'lodash/pick';
import { Category } from './Category';
import { format } from 'date-fns';
import { KindEnum } from './Kind';


const offset = new Date().getTimezoneOffset();

export function toUtcTimestamp(date) {
    const timestamp = date instanceof Date ? date.getTime() : date;
    return timestamp - offset * 60 * 1000;
}

export function toLocalTimestamp(date) {
    const timestamp = date instanceof Date ? date.getTime() : date;
    return timestamp + offset * 60 * 1000;
}
export class Transaction {
    id: number;
    accountId: string;
    description: string;
    categoryId: number;
    categoryName: string;
    amount: number;
    time: Date;
    category: Category;
    kind: number;
    fromForm(data) {
        return {
            ...data,
            id: data.id || `T${Date.now()}`,
            amount: Currency.toInt(
                data.amount * (data.kind === KindEnum.EXPENSE ? -1 : 1),
                data.currency
            ),
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            category: data.category,
            time: data.time ? new Date(data.time) : undefined
        };
    }
    toForm(data) {
        // console.log(data.amount, data.kind);

        return {
            ...data,
            amount: Currency.toFloat(
                data.amount  * (data.kind === KindEnum.EXPENSE ? -1 : 1),
                data.currency,
                false
            ),
            linkedAmount:
                data.kind === KindEnum.TRANSFER
                    ? Currency.toFloat(data.linkedAmount, data.linkedCurrency)
                    : undefined,
            category: data.category,
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            accountId: data.accountId,
            time: data.time
                ? format(toLocalTimestamp(data.time), 'YYYY-MM-DD')
                : undefined
        };
    }
    fromStorage(data) {
        return {
            id: data._id,
            date: parseInt(data._id.match(/T([0-9]+)-/)[1], 10),
            ...pick(data, this.persistentKeys(data))
        };
    }
    toStorage(data) {
        return pick(data, this.persistentKeys(data));
    }
    persistentKeys(data) {
        const keys = ['kind', 'note', 'tags', 'accountId', 'amount', 'currency'];
        if (data.kind === KindEnum.TRANSFER) {
            keys.push(...['linkedAccountId', 'linkedAmount', 'linkedCurrency']);
        }

        return keys;
    }

}
