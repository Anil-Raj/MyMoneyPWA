import { KindEnum } from './Transaction';


export class Category {
    _id: number;
    name: string;
    description: string;
    parentCategory: string;
    Kind: number;

    fromForm(data) {
        return {
            ...data,
            id: data.id || `C${Date.now()}`,
            Kind: data.Type === 'Income' ? KindEnum.INCOME : KindEnum.EXPENSE
            // amount: Currency.toInt(
            //     data.amount * (data.kind === KindEnum.EXPENSE ? -1 : 1),
            //     data.currency
            // ),
            // categoryId: data.categoryId,
            // categoryName: data.categoryName,
            // category: data.category,
            // time: data.time ? new Date(data.time) : undefined
        };
    }
}
