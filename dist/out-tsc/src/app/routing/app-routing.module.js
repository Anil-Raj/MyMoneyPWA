"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var transaction_list_component_1 = require("./../components/transaction/transaction-list/transaction-list.component");
var transaction_detail_component_1 = require("./../components/transaction/transaction-detail/transaction-detail.component");
var transaction_add_component_1 = require("./../components/transaction/transaction-add/transaction-add.component");
var transaction_edit_component_1 = require("./../components/transaction/transaction-edit/transaction-edit.component");
var category_list_component_1 = require("./../components/category/category-list/category-list.component");
var trend_component_1 = require("./../components/trend/trend.component");
var debt_component_1 = require("./../components/debt/debt.component");
var setting_component_1 = require("./../components/setting/setting.component");
var category_add_component_1 = require("./../components/category/category-add/category-add.component");
var category_detail_component_1 = require("./../components/category/category-detail/category-detail.component");
var category_edit_component_1 = require("./../components/category/category-edit/category-edit.component");
var fitness_component_1 = require("./../components/fitness/fitness.component");
var google_signin_component_1 = require("./../components/google-signin/google-signin.component");
var account_list_component_1 = require("../components/account/account-list/account-list.component");
var routes = [
    { path: 'transaction', component: transaction_list_component_1.TransactionListComponent },
    { path: 'account', component: account_list_component_1.AccountListComponent },
    { path: 'transaction/:id', component: transaction_detail_component_1.TransactionDetailComponent },
    { path: 'transaction/edit/:id', component: transaction_edit_component_1.TransactionEditComponent },
    { path: 'transaction-add', component: transaction_add_component_1.TransactionAddComponent },
    { path: 'debt', component: debt_component_1.DebtComponent },
    { path: 'trend', component: trend_component_1.TrendComponent },
    { path: 'category', component: category_list_component_1.CategoryListComponent },
    { path: 'category/:id', component: category_detail_component_1.CategoryDetailComponent },
    { path: 'category/edit/:id', component: category_edit_component_1.CategoryEditComponent },
    { path: 'category-add', component: category_add_component_1.CategoryAddComponent },
    { path: 'settings', component: setting_component_1.SettingComponent },
    { path: 'fitness', component: fitness_component_1.FitnessComponent },
    { path: '', redirectTo: 'transaction', pathMatch: 'full' },
    { path: 'sign-in', component: google_signin_component_1.GoogleSignInComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map