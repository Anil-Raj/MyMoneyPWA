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
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var Category_1 = require("../../../Models/Category");
var pouchdb_service_1 = require("../../../services/pouchdb.service");
var router_1 = require("@angular/router");
var animations_1 = require("../../../animations/animations");
var CategoryAddComponent = /** @class */ (function () {
    function CategoryAddComponent(database, router, location, meta) {
        this.database = database;
        this.router = router;
        this.location = location;
        this.meta = meta;
        this.isSaveCalled = false;
        this.category = null;
    }
    CategoryAddComponent.prototype.ngOnInit = function () {
        var metaDef = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.addCategoryForm = new forms_1.FormGroup({
            Icon: new forms_1.FormControl('', forms_1.Validators.required),
            Note: new forms_1.FormControl(),
            Name: new forms_1.FormControl('', forms_1.Validators.required),
            Type: new forms_1.FormControl('Income'),
        });
    };
    CategoryAddComponent.prototype.ngOnDestroy = function () {
        var metaDef = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    };
    CategoryAddComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var valid = _a.valid, value = _a.value;
        if (valid) {
            // value.id = 'category_' + value.Type.toLowerCase() + '_' + new Date().valueOf();
            var cat = new Category_1.Category();
            var c = void 0;
            c = cat.fromForm(value);
            // const category = value;
            // category.id = 'category_' + value.Type.toLowerCase() + '_' + new Date().valueOf();
            console.log(c);
            this.database.put_cat('transaction_' + new Date().valueOf(), c).then(function () {
                // this.database.put_cat(c).then(() => {
                _this.router.navigate(['/category/']);
            });
        }
    };
    CategoryAddComponent.prototype.back = function () {
        this.location.back();
    };
    CategoryAddComponent = __decorate([
        core_1.Component({
            selector: 'app-category-add',
            templateUrl: './category-add.component.html',
            styleUrls: ['./category-add.component.css'],
            animations: [animations_1.Animations.slideUp],
        }),
        __metadata("design:paramtypes", [pouchdb_service_1.PouchDBService, router_1.Router, common_1.Location, platform_browser_1.Meta])
    ], CategoryAddComponent);
    return CategoryAddComponent;
}());
exports.CategoryAddComponent = CategoryAddComponent;
//# sourceMappingURL=category-add.component.js.map