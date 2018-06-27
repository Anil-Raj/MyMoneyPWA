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
var sidebar_service_1 = require("../../services/sidebar.service");
exports.ROUTES = [
    { path: 'transaction', title: 'Transactions', icon: 'account_balance_wallet', class: '' },
    { path: 'debt', title: 'Debts', icon: 'dock', class: '' },
    { path: 'trend', title: 'Trends', icon: 'trending_up', class: '' },
    { path: 'category', title: 'Categories', icon: 'category', class: '' },
    { path: 'account', title: 'Accounts', icon: 'bank', class: '' },
    { path: 'sign-in', title: 'Sign In', icon: 'account_circle', class: '' },
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(nav) {
        this.nav = nav;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = exports.ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent.prototype.closeSidebar = function () {
        this.nav.hide();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        }),
        __metadata("design:paramtypes", [sidebar_service_1.SidebarService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map