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
var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent(database) {
        this.database = database;
        this.groupByFilter = 'Type';
    }
    CategoryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.database.get_cat().subscribe(function (categories) {
            console.log(categories);
            _this.categories_data = categories.rows.map(function (row) {
                return row.doc;
            });
            console.log(_this.categories_data);
        });
    };
    CategoryListComponent = __decorate([
        core_1.Component({
            selector: 'app-category-list',
            templateUrl: './category-list.component.html',
            styleUrls: ['./category-list.component.css'],
        }),
        __metadata("design:paramtypes", [pouchdb_service_1.PouchDBService])
    ], CategoryListComponent);
    return CategoryListComponent;
}());
exports.CategoryListComponent = CategoryListComponent;
//# sourceMappingURL=category-list.component.js.map