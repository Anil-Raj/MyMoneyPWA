"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment");
var ViewByPipe = /** @class */ (function () {
    function ViewByPipe() {
    }
    ViewByPipe.prototype.transform = function (value, args) {
        var filteredData = [];
        if (value) {
            filteredData = value.filter(function (transaction) {
                if (args.isFuture) {
                    if (moment(transaction.time).add(1, 'm').isBetween(moment(args.start).startOf('D'), moment(args.start).endOf('D').add(3, 'M'))) {
                        return transaction;
                    }
                }
                if (args.range === 'day') {
                    if (moment(transaction.time).add(1, 'm').isBetween(moment(args.start).startOf('D'), moment(args.start).endOf('D'))) {
                        return transaction;
                    }
                }
                else if (args.range === 'week') {
                    if (moment(transaction.time).add(1, 'm').isBetween(moment(args.start).startOf('w'), moment(args.start).endOf('w'))) {
                        return transaction;
                    }
                }
                else if (args.range === 'month') {
                    if (moment(transaction.time).add(1, 'm').isBetween(moment(args.start).startOf('M'), moment(args.start).endOf('M'))) {
                        return transaction;
                    }
                }
                else if (moment(transaction.time).isBetween(moment().startOf(args.range), moment().endOf(args.range))) {
                    return transaction;
                }
            });
        }
        return filteredData;
    };
    ViewByPipe = __decorate([
        core_1.Pipe({
            name: 'viewBy'
        })
    ], ViewByPipe);
    return ViewByPipe;
}());
exports.ViewByPipe = ViewByPipe;
//# sourceMappingURL=view-by.pipe.js.map