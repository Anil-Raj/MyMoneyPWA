"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_by_pipe_1 = require("./group-by.pipe");
describe('GroupByPipe', function () {
    it('create an instance', function () {
        var transaction = [
            { Name: 'Cloth', Type: 'Expense', _id: 'category_expense_1', Icon: '/assets/myicons/ml/icon_17.png' },
            // { Name: 'Electronic Gadgets', Type: 'Expense', _id: 'category_expense_2', Icon: '/assets/myicons/ml/icon_9.png' },
            // { Name: 'Travel', Type: 'Expense', _id: 'category_expense_3', Icon: '/assets/myicons/ml/ic_category_travel.png' },
            { Name: 'Salary', Type: 'Income', _id: 'category_income_1', Icon: '/assets/myicons/ml/ic_category_salary.png' }
        ];
        var expect1 = [{
                key: 'Expense',
                value: [{ Name: 'Cloth', Type: 'Expense', _id: 'category_expense_1', Icon: '/assets/myicons/ml/icon_17.png' },
                ]
            },
            {
                key: 'Income', value: [
                    { Name: 'Salary', Type: 'Income', _id: 'category_income_1', Icon: '/assets/myicons/ml/ic_category_salary.png' }
                ]
            }
        ];
        var a = [{ b: "icon" }];
        var c = [{ key: 'icon', value: [{ b: "icon" }] }];
        var pipe = new group_by_pipe_1.GroupByPipe();
        expect(pipe.transform(transaction, 'Type')).toBe(expect1);
    });
});
//# sourceMappingURL=group-by.pipe.spec.js.map