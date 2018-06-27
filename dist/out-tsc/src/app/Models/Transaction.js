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
var date_fns_1 = require("date-fns");
var Kind_1 = require("./Kind");
var offset = new Date().getTimezoneOffset();
function toUtcTimestamp(date) {
    var timestamp = date instanceof Date ? date.getTime() : date;
    return timestamp - offset * 60 * 1000;
}
exports.toUtcTimestamp = toUtcTimestamp;
function toLocalTimestamp(date) {
    var timestamp = date instanceof Date ? date.getTime() : date;
    return timestamp + offset * 60 * 1000;
}
exports.toLocalTimestamp = toLocalTimestamp;
exports.Transaction = {
    fromForm: function (data) {
        return __assign({}, data, { id: data.id || "T" + Date.now(), amount: Currency_1.default.toInt(data.amount * (data.category.Kind === Kind_1.KindEnum.EXPENSE ? -1 : 1), data.currency), category: data.category, time: data.time ? new Date(data.time) : undefined });
    },
    toForm: function (data) {
        return __assign({}, data, { amount: Currency_1.default.toFloat(data.amount * (data.category.Kind === Kind_1.KindEnum.EXPENSE ? -1 : 1), data.currency, false), linkedAmount: data.category.Kind === Kind_1.KindEnum.TRANSFER
                ? Currency_1.default.toFloat(data.linkedAmount, data.linkedCurrency)
                : undefined, category: data.category, categoryId: data.category._id, accountId: data.accountId, time: data.time
                ? date_fns_1.format(toLocalTimestamp(data.time), 'YYYY-MM-DD')
                : undefined });
    },
    fromStorage: function (data) {
        return __assign({ id: data._id, date: parseInt(data._id.match(/T([0-9]+)-/)[1], 10) }, data);
    }
};
//# sourceMappingURL=Transaction.js.map