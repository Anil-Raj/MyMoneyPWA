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
var pouchdb_service_1 = require("../../services/pouchdb.service");
var router_1 = require("@angular/router");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(nav, navService, database, router) {
        var _this = this;
        this.nav = nav;
        this.navService = navService;
        this.database = database;
        this.router = router;
        this.gb = sidebar_service_1.GroupBy;
        this.navService.viewBy.subscribe(function (a) { return _this.viewByFilter = a.range; });
        // this.viewByFilter = this.navService.viewBy.getValue().range;
        console.log(this.viewByFilter);
    }
    NavbarComponent.prototype.navOpen = function () {
        this.nav.show();
    };
    NavbarComponent.prototype.groupByTransaction = function () {
        this.nav.confirmGroupBy('time');
    };
    NavbarComponent.prototype.groupByCategory = function () {
        this.nav.confirmGroupBy('categoryId');
    };
    NavbarComponent.prototype.groupByMonth = function () {
        this.nav.confirmViewBy('month');
    };
    NavbarComponent.prototype.groupByDay = function () {
        this.nav.confirmViewBy('day');
    };
    NavbarComponent.prototype.groupByWeek = function () {
        this.nav.confirmViewBy('week');
    };
    NavbarComponent.prototype.sync = function () {
        if (localStorage.getItem('user') === null) {
            this.router.navigate(['/sign-in/']);
            // this.database.sync(localStorage.getItem('user'));
        }
        else {
            this.database.sync(localStorage.getItem('user'));
        }
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        }),
        __metadata("design:paramtypes", [sidebar_service_1.SidebarService,
            sidebar_service_1.SidebarService,
            pouchdb_service_1.PouchDBService,
            router_1.Router])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map