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
var forms_1 = require("@angular/forms");
var pouchdb_service_1 = require("../../../services/pouchdb.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var CategoryEditComponent = /** @class */ (function () {
    function CategoryEditComponent(database, router, route, location, meta) {
        this.database = database;
        this.router = router;
        this.route = route;
        this.location = location;
        this.meta = meta;
    }
    CategoryEditComponent.prototype.ngOnInit = function () {
        var metaDef = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.getCategory();
        this.addCategoryForm = new forms_1.FormGroup({
            Icon: new forms_1.FormControl(),
            Note: new forms_1.FormControl(),
            Name: new forms_1.FormControl('', forms_1.Validators.required),
            Type: new forms_1.FormControl(),
        });
    };
    CategoryEditComponent.prototype.ngOnDestroy = function () {
        var metaDef = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    };
    CategoryEditComponent.prototype.getCategory = function () {
        var _this = this;
        this.id = this.route.snapshot.paramMap.get('id');
        this.database.get_cat().subscribe(function (categories) {
            var category_list = categories.rows.map(function (row) {
                return row.doc;
            });
            _this.category = category_list.filter(function (c) { return c._id === _this.id; });
            _this.addCategoryForm.patchValue({
                Icon: _this.category[0].Icon,
                Note: _this.category[0].Note,
                Name: _this.category[0].Name,
                Type: _this.category[0].Type
            });
        });
    };
    CategoryEditComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var valid = _a.valid, value = _a.value;
        if (valid) {
            var transaction = value;
            console.log(transaction);
            this.database.put(this.id, transaction).then(function () {
                _this.router.navigate(['/category/']);
            });
        }
    };
    CategoryEditComponent.prototype.back = function () {
        this.location.back();
    };
    CategoryEditComponent = __decorate([
        core_1.Component({
            selector: 'app-category-edit',
            templateUrl: './category-edit.component.html',
            styleUrls: ['./category-edit.component.css'],
        }),
        __metadata("design:paramtypes", [pouchdb_service_1.PouchDBService, router_1.Router, router_1.ActivatedRoute,
            common_1.Location, platform_browser_1.Meta])
    ], CategoryEditComponent);
    return CategoryEditComponent;
}());
exports.CategoryEditComponent = CategoryEditComponent;
//# sourceMappingURL=category-edit.component.js.map