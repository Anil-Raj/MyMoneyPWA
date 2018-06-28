import { KindEnum } from './Kind';

const TEMPLATE_DATA = [
  {
      Name: 'Other', Kind: 0, Type: 'Expense', _id: 'C0',
      Icon: '/assets/myicons/ml/ic_category_other_expense.png'
  },
  {
      Name: 'Other', Kind: 1, Type: 'Income', _id: 'C1',
      Icon: '/assets/myicons/ml/ic_category_other_income.png'

  },
  {
      Name: 'Cloth', Kind: 0, Type: 'Expense', _id: 'C2',
      Icon: '/assets/myicons/ml/icon_17.png'
  },
  {
      Name: 'Travel', Kind: 0, Type: 'Expense', _id: 'C3',
      Icon: '/assets/myicons/ml/ic_category_travel.png'
  },
  {
      Name: 'Salary', Kind: 1, Type: 'Income', _id: 'C4',
      Icon: '/assets/myicons/ml/ic_category_salary.png'
  },
  {
      Name: 'Interest Money', Kind: 1, Type: 'Income', _id: 'C5',
      Icon: '/assets/myicons/ml/ic_category_interestmoney.png',
  }
]

import Currency from './Currency'

export const Category =  {
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
  },
  getTemplateData(){
    return TEMPLATE_DATA;
  }
}