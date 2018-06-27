import { KindEnum } from './Kind';


// export class Category {
//     _id: number;
//     name: string;
//     description: string;
//     parentCategory: string;
//     Kind: number;

//     fromForm(data) {
//         return {
//             ...data,
//             id: data.id || `C${Date.now()}`,
//             Kind: data.Type === 'Income' ? KindEnum.INCOME : KindEnum.EXPENSE
//             // amount: Currency.toInt(
//             //     data.amount * (data.kind === KindEnum.EXPENSE ? -1 : 1),
//             //     data.currency
//             // ),
//             // categoryId: data.categoryId,
//             // categoryName: data.categoryName,
//             // category: data.category,
//             // time: data.time ? new Date(data.time) : undefined
//         };
//     }
// }

import Currency from './Currency'

export const Account =  {
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
    },
  toForm(data) {
    return {
      ...data
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      ...data
    }
  },
  toStorage(data) {
    return {
        _id: data.id,
        ...data
      }
  }
}