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
var Transaction_1 = require("../../../Models/Transaction");
var Kind_1 = require("../../../Models/Kind");
var router_1 = require("@angular/router");
var sidebar_service_1 = require("../../../services/sidebar.service");
require("hammerjs");
var transaction_1 = require("../../../storage/transaction");
var Timerange_1 = require("./Timerange");
var TransactionListComponent = /** @class */ (function () {
    function TransactionListComponent(route, navService) {
        var _this = this;
        this.route = route;
        this.navService = navService;
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this.timerangeList = [];
        this.groupByFilter = 'categoryId';
        this.kindEnum = Kind_1.KindEnum;
        transaction_1.default.loadAll().then(function (transactions) {
            console.log(transactions);
            _this.transactionsFromAllAccount = transactions
                .map(function (row) { return Transaction_1.Transaction.toForm(row); });
            _this.navService.account.subscribe(function (ac) {
                _this.selecctedAccount = ac;
                console.log(ac);
                _this.transactions = _this.transactionsFromAllAccount
                    .filter(function (tr) { return tr.accountId == ac.id; });
            });
        });
        this.navService.groupBy.subscribe(function (a) { return _this.groupByFilter = a; });
        this.navService.viewBy.subscribe(function (a) { return _this.viewByFilter = a; });
        this.updateTimerange();
    }
    TransactionListComponent.prototype.updateTimerange = function () {
        var _this = this;
        this.navService.viewBy.subscribe(function (range) {
            var tr = new Timerange_1.Timerange();
            _this.timerangeList = tr.getTimeRangeList(_this.viewByFilter);
            _this.selectedIndex = _this.timerangeList.length - 2;
        });
    };
    TransactionListComponent.prototype.swipe = function (currentIndex, action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (currentIndex > this.timerangeList.length - 1 || currentIndex < 0)
            return;
        if (action === this.SWIPE_ACTION.LEFT) {
            this.selectedIndex += currentIndex < this.timerangeList.length - 1 ? 1 : 0;
        }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.selectedIndex -= currentIndex > 0 ? 1 : 0;
        }
    };
    TransactionListComponent.prototype.sum = function (items) {
        var sum = 0;
        items.map(function (item) {
            sum += (parseInt(item.amount, 10) * (item.category.Kind === Kind_1.KindEnum.INCOME ? 1 : -1));
        });
        return sum;
    };
    TransactionListComponent.prototype.income = function (transactions) {
        var sum = 0;
        transactions
            .filter(function (tr) { return tr.category.Kind === Kind_1.KindEnum.INCOME; })
            .map(function (a) {
            sum += parseInt(a.amount, 10);
        });
        return sum;
    };
    TransactionListComponent.prototype.expense = function (transactions) {
        var sum = 0;
        transactions
            .filter(function (tr) { return tr.category.Kind === Kind_1.KindEnum.EXPENSE; })
            .map(function (a) {
            sum += parseInt(a.amount, 10);
        });
        return sum;
    };
    TransactionListComponent.prototype.netamount = function (transactions) {
        return this.income(transactions) - this.expense(transactions);
    };
    TransactionListComponent = __decorate([
        core_1.Component({
            selector: 'app-transaction-list',
            templateUrl: './transaction-list.component.html',
            styleUrls: ['./transaction-list.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            sidebar_service_1.SidebarService])
    ], TransactionListComponent);
    return TransactionListComponent;
}());
exports.TransactionListComponent = TransactionListComponent;
//# sourceMappingURL=transaction-list.component.js.map