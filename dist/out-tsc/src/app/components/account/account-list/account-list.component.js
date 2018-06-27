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
var pouchdb_service_1 = require("../../../services/pouchdb.service");
var accounts_1 = require("../../../storage/accounts");
var currency_service_1 = require("../../../services/currency.service");
var AccountListComponent = /** @class */ (function () {
    function AccountListComponent(database, currService) {
        this.database = database;
        this.currService = currService;
        this.groupByFilter = 'Type';
    }
    AccountListComponent.prototype.ngOnInit = function () {
        var _this = this;
        accounts_1.default.loadAll().then(function (accounts) {
            console.log(accounts);
            _this.accounts_data = accounts;
            accounts.map(function (a) {
                var sum = 0;
                a.currencies.map(function (currency) {
                    if (currency == 'USD') {
                        sum += a.balance[currency];
                        console.log('us', sum);
                        return;
                    }
                    console.log(currency, a.balance[currency]);
                    // console.log(this.currService.fetchExchangeRates('USD', Currency));
                    _this.currService.fetchExchangeRates('USD', currency).subscribe(function (rate) {
                        console.log(rate);
                        sum += a.balance[currency] * rate.value;
                    });
                });
                console.log(sum);
            });
        });
    };
    AccountListComponent = __decorate([
        core_1.Component({
            selector: 'app-account-list',
            templateUrl: './account-list.component.html',
            styleUrls: ['./account-list.component.css'],
        }),
        __metadata("design:paramtypes", [pouchdb_service_1.PouchDBService, currency_service_1.CurrencyService])
    ], AccountListComponent);
    return AccountListComponent;
}());
exports.AccountListComponent = AccountListComponent;
//# sourceMappingURL=account-list.component.js.map