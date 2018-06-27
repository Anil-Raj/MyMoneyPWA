"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var account_select_component_1 = require("./account-select/account-select.component");
var account_list_component_1 = require("./account-list/account-list.component");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var currency_service_1 = require("../../services/currency.service");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MatListModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatToolbarModule
            ],
            declarations: [account_select_component_1.AccountSelectComponent, account_list_component_1.AccountListComponent],
            exports: [account_select_component_1.AccountSelectComponent, account_list_component_1.AccountListComponent],
            providers: [currency_service_1.CurrencyService]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map