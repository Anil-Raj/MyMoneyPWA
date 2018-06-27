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
var sidebar_service_1 = require("../../../services/sidebar.service");
var pouchdb_service_1 = require("../../../services/pouchdb.service");
var animations_1 = require("../../../animations/animations");
var accounts_1 = require("../../../storage/accounts");
var Account_1 = require("../../../Models/Account");
var AccountSelectComponent = /** @class */ (function () {
    function AccountSelectComponent(navService, database) {
        this.navService = navService;
        this.database = database;
        this.accounts = [];
        this.isSelectAccount = false;
    }
    AccountSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        accounts_1.default.loadAll().then(function (acc) {
            console.log(acc);
            // this.selectedAccount = this.accounts[0];
            _this.navService.account.subscribe(function (ac) { return _this.selectedAccount = ac; });
        });
    };
    AccountSelectComponent.prototype.displaySelectAccount = function () {
        this.isSelectAccount = true;
    };
    AccountSelectComponent.prototype.select = function (account) {
        this.navService.confirmAccountValue(account);
        this.selectedAccount = account;
        this.isSelectAccount = false;
    };
    AccountSelectComponent.prototype.back = function () {
        this.isSelectAccount = false;
    };
    AccountSelectComponent.prototype.createAcc = function () {
        var data = {
            id: 'A123456',
            name: 'Test',
            group: 'cash',
            balance: {
                USD: 0,
                JPY: 0
            },
            currencies: ["USD", "EUR", "JPY"]
        };
        var acc1 = Account_1.Account.toStorage(data);
        console.log(accounts_1.default.save(acc1));
    };
    AccountSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-account-select',
            templateUrl: './account-select.component.html',
            styleUrls: ['./account-select.component.css'],
            animations: [animations_1.Animations.flyInOut],
        }),
        __metadata("design:paramtypes", [sidebar_service_1.SidebarService, pouchdb_service_1.PouchDBService])
    ], AccountSelectComponent);
    return AccountSelectComponent;
}());
exports.AccountSelectComponent = AccountSelectComponent;
//# sourceMappingURL=account-select.component.js.map