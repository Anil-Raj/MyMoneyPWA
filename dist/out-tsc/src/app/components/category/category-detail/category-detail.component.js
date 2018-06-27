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
var router_1 = require("@angular/router");
var pouchdb_service_1 = require("../../../services/pouchdb.service");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var CategoryDetailComponent = /** @class */ (function () {
    function CategoryDetailComponent(database, router, route, location, meta) {
        this.database = database;
        this.router = router;
        this.route = route;
        this.location = location;
        this.meta = meta;
    }
    CategoryDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var metaDef = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
        this.database.get_cat().subscribe(function (categories) {
            console.log(categories);
            var category_list = categories.rows.map(function (row) {
                return row.doc;
            });
            console.log(category_list);
            _this.category = category_list.filter(function (c) { return c._id === _this.id; });
            console.log(_this.category);
        });
    };
    CategoryDetailComponent.prototype.back = function () {
        this.location.back();
    };
    CategoryDetailComponent.prototype.ngOnDestroy = function () {
        var metaDef = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    };
    CategoryDetailComponent.prototype.del = function (tr) {
        var _this = this;
        this.database.del_cat(tr).then(function (a) {
            console.log(a);
            _this.router.navigate(['/category/']);
        });
    };
    CategoryDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-category-detail',
            templateUrl: './category-detail.component.html',
            styleUrls: ['./category-detail.component.css'],
        }),
        __metadata("design:paramtypes", [pouchdb_service_1.PouchDBService,
            router_1.Router,
            router_1.ActivatedRoute,
            common_1.Location,
            platform_browser_1.Meta])
    ], CategoryDetailComponent);
    return CategoryDetailComponent;
}());
exports.CategoryDetailComponent = CategoryDetailComponent;
//# sourceMappingURL=category-detail.component.js.map