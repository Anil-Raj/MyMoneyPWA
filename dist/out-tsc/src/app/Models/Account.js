"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Currency_1 = require("./Currency");
var GROUP = {
    cash: 'Cash',
    bank: 'Bank Account',
    deposit: 'Deposit',
    credit: 'Credit',
    asset: 'Asset'
};
// export const DELETE_STRATEGY_ARCHIVE = 0
// export const DELETE_STRATEGY_CLEANUP = 1
// export const DELETE_STRATEGY_MOVE = 2
exports.Account = {
    fromForm: function (data) {
        return __assign({}, data, { id: data.id || "A" + Date.now(), balance: Object.keys(data.balance).reduce(function (acc, code) {
                acc[code] = Currency_1.default.toInt(data.balance[code] !== '' ? data.balance[code] : 0, code);
                return acc;
            }, {}) });
    },
    toForm: function (data) {
        return __assign({}, data, { balance: Object.keys(data.balance).reduce(function (acc, code) {
                acc[code] = Currency_1.default.toFloat(data.balance[code], code, false);
                return acc;
            }, {}) });
    },
    fromStorage: function (data) {
        return __assign({ id: data._id }, data);
    },
    toStorage: function (data) {
        return data;
    },
    mutateBalance: function (account, currency, amount) {
        var _a;
        return __assign({}, account, { currencies: account.currencies.concat([account.currencies.indexOf(currency) || currency]), balance: __assign({}, account.balance, (_a = {}, _a[currency] = parseInt(account.balance[currency] || 0, 10) + amount, _a)) });
    },
    net: function (account, base_currency) {
        console.log(account);
        account.currencies.map(function (currency) {
            console.log(currency, account.balance[currency]);
        });
    }
};
//# sourceMappingURL=Account.js.map