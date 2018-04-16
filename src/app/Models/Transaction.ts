import Currency from './Currency';
import { Category } from './Category';
import { format } from 'date-fns';

export const EXPENSE = 0;
export const TRANSFER = 1;
export const INCOME = 2;

export enum KindEnum {
    EXPENSE = 0,
    INCOME = 1,
    TRANSFER = 2
}

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
        console.log(data.amount, data.kind);

        return {
            ...data,
            amount: Currency.toFloat(
                data.amount * (data.kind === KindEnum.EXPENSE ? -1 : 1),
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
}
