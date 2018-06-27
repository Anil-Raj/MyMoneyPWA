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
var Kind_1 = require("./Kind");
var Category = /** @class */ (function () {
    function Category() {
    }
    Category.prototype.fromForm = function (data) {
        return __assign({}, data, { id: data.id || "C" + Date.now(), Kind: data.Type === 'Income' ? Kind_1.KindEnum.INCOME : Kind_1.KindEnum.EXPENSE });
    };
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map