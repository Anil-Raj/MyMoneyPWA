import Currency from './Currency';
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
export const Transaction = {
    fromForm(data) {
        return {
            ...data,
            id: data.id || `T${Date.now()}`,
            amount: Currency.toInt(
                data.amount * (data.category.Kind === KindEnum.EXPENSE ? -1 : 1),
                data.currency
            ),
            category: data.category,
            time: data.time ? new Date(data.time) : undefined
        };
    },
    toForm(data) {
        return {
            ...data,
            amount: Currency.toFloat(
                data.amount  * (data.category.Kind === KindEnum.EXPENSE ? -1 : 1),
                data.currency,
                false
            ),
            linkedAmount:
                data.category.Kind === KindEnum.TRANSFER
                    ? Currency.toFloat(data.linkedAmount, data.linkedCurrency)
                    : undefined,
            category: data.category,
            categoryId: data.category._id,
            accountId: data.accountId,
            time: data.time
                ? format(toLocalTimestamp(data.time), 'YYYY-MM-DD')
                : undefined
        };
    },
    fromStorage(data) {
        return {
            id: data._id,
            date: parseInt(data._id.match(/T([0-9]+)-/)[1], 10),
            ...data
        };
    }

}
