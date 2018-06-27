"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var accounts_1 = require("../storage/accounts");
var GroupBy;
(function (GroupBy) {
    GroupBy[GroupBy["Category"] = 0] = "Category";
    GroupBy[GroupBy["Transaction"] = 1] = "Transaction";
})(GroupBy = exports.GroupBy || (exports.GroupBy = {}));
var ViewBy;
(function (ViewBy) {
    ViewBy[ViewBy["Day"] = 0] = "Day";
    ViewBy[ViewBy["Week"] = 1] = "Week";
    ViewBy[ViewBy["Month"] = 2] = "Month";
    ViewBy[ViewBy["Year"] = 3] = "Year";
})(ViewBy = exports.ViewBy || (exports.ViewBy = {}));
var SidebarService = /** @class */ (function () {
    //constructor(private database: PouchDBService) {
    //}
    function SidebarService() {
        var _this = this;
        this.groupBy = new BehaviorSubject_1.BehaviorSubject('categoryId');
        this.viewBy = new BehaviorSubject_1.BehaviorSubject({ value: 0, range: 'week' });
        // viewBy: any = { value: 0, range: 'week' };
        this.account = new BehaviorSubject_1.BehaviorSubject({ adfasd: 1121 });
        this.visible = false;
        accounts_1.default.loadAll().then(function (ac) {
            console.log(ac);
            _this.account.next(ac[0]);
            console.log(_this.account.getValue());
        });
    }
    SidebarService.prototype.confirmGroupBy = function (groupBy) {
        this.groupBy.next(groupBy);
    };
    SidebarService.prototype.confirmViewBy = function (range) {
        // console.log(viewBy);
        console.log(range, { value: this.viewBy.getValue().value, range: range });
        this.viewBy.next({ value: this.viewBy.getValue().value, range: range });
    };
    // confirmViewByValue(value) {
    //     console.log(value);
    //     console.log({ value: value, range: this.viewBy.getValue().range });
    //     this.viewBy.next({ value: value, range: this.viewBy.getValue().range });
    // }
    SidebarService.prototype.confirmViewByValue = function (value) {
        // this.viewBy.getValue().value = value;
        this.viewBy.next({ value: value, range: this.viewBy.getValue().range });
    };
    SidebarService.prototype.confirmAccountValue = function (value) {
        console.log(value);
        console.log({ value: value, range: this.viewBy.getValue().range });
        this.account.next(value);
    };
    SidebarService.prototype.hide = function () { this.visible = false; };
    SidebarService.prototype.show = function () { this.visible = true; };
    SidebarService.prototype.toggle = function () { this.visible = !this.visible; };
    SidebarService.prototype.doSomethingElseUseful = function () { };
    SidebarService.prototype.getGroupByOptions = function () {
        var gb = GroupBy;
        if (this.groupBy.getValue() === 'categoryId') {
            return gb.Transaction;
        }
        else {
            return gb.Category;
        }
    };
    // getViewByOptions() {
    //     const vb = ViewBy;
    //     if (this.viewBy.getValue().range === 'week') {
    //         return vb.Week;
    //     } else if (this.viewBy.getValue().range === 'month') {
    //         return vb.Month;
    //     } else {
    //         return vb.Year;
    //     }
    // }
    SidebarService.prototype.getViewByOptions = function () {
        var vb = ViewBy;
        return this.viewBy.getValue().range === 'week' ? vb.Week : (this.viewBy.getValue().range === 'month' ? vb.Month : vb.Day);
    };
    SidebarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SidebarService);
    return SidebarService;
}());
exports.SidebarService = SidebarService;
//# sourceMappingURL=sidebar.service.js.map