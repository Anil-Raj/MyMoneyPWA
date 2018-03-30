import { GroupByPipe } from './group-by.pipe';

describe('GroupByPipe', () => {
    it('create an instance', () => {
        const transaction = [
            { Name: 'Cloth', Type: 'Expense', _id: 'category_expense_1', Icon: '/assets/myicons/ml/icon_17.png' },
            // { Name: 'Electronic Gadgets', Type: 'Expense', _id: 'category_expense_2', Icon: '/assets/myicons/ml/icon_9.png' },
            // { Name: 'Travel', Type: 'Expense', _id: 'category_expense_3', Icon: '/assets/myicons/ml/ic_category_travel.png' },
            { Name: 'Salary', Type: 'Income', _id: 'category_income_1', Icon: '/assets/myicons/ml/ic_category_salary.png' }
        ];
        const expect1 = [{
            key: 'Expense',
            value:
                [{ Name: 'Cloth', Type: 'Expense', _id: 'category_expense_1', Icon: '/assets/myicons/ml/icon_17.png' },
                // { Name: 'Electronic Gadgets', Type: 'Expense', _id: 'category_expense_2', Icon: '/assets/myicons/ml/icon_9.png' },
                // { Name: 'Travel', Type: 'Expense', _id: 'category_expense_3', Icon: '/assets/myicons/ml/ic_category_travel.png' }
                ]
        },

        {
            key: 'Income', value: [
                { Name: 'Salary', Type: 'Income', _id: 'category_income_1', Icon: '/assets/myicons/ml/ic_category_salary.png' }
            ]
        }

        ];
        const a = [{ b: "icon" }];
        const c = [{key: 'icon', value: [{ b: "icon" }]}]
        const pipe = new GroupByPipe();
        expect(pipe.transform(transaction,'Type')).toBe(expect1);
    });
});
