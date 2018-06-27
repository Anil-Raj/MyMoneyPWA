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
var category_service_1 = require("../../../services/category.service");
var pouchdb_service_1 = require("../../../services/pouchdb.service");
var animations_1 = require("../../../animations/animations");
var CategoryInputComponent = /** @class */ (function () {
    function CategoryInputComponent(categoryServie, database) {
        var _this = this;
        this.categoryServie = categoryServie;
        this.database = database;
        this.isSelectCategory = false;
        this.categories = [];
        this.icon_not_selected = '/assets/myicons/ml/icon_not_selected.png';
        this.propagateChange = function () { };
        this.validateFn = function () { };
        // this.categoryServie.awaiCategories().subscribe(a => this.categories  = a);
        this.categories = this.database.get_cat().subscribe(function (categories) {
            _this.categories = categories.rows.map(function (row) {
                return row.doc;
            });
            console.log(_this.categories);
        });
    }
    CategoryInputComponent_1 = CategoryInputComponent;
    CategoryInputComponent.prototype.ngOnInit = function () {
        console.log(this.category);
        // this.selectedCategory = this.category.category.value;
    };
    CategoryInputComponent.prototype.displaySelectCategory = function () {
        this.isSelectCategory = true;
    };
    Object.defineProperty(CategoryInputComponent.prototype, "counterValue", {
        get: function () {
            return this.selectedCategory;
        },
        set: function (val) {
            this.selectedCategory = val;
            this.propagateChange(val);
        },
        enumerable: true,
        configurable: true
    });
    CategoryInputComponent.prototype.ngOnChanges = function (inputs) {
        this.propagateChange(this.counterValue);
    };
    CategoryInputComponent.prototype.writeValue = function (value) {
        if (value) {
            this.counterValue = value;
        }
    };
    CategoryInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CategoryInputComponent.prototype.registerOnTouched = function () { };
    CategoryInputComponent.prototype.select = function (category) {
        this.counterValue = category;
        this.isSelectCategory = false;
    };
    CategoryInputComponent.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    var CategoryInputComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CategoryInputComponent.prototype, "category", void 0);
    CategoryInputComponent = CategoryInputComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-cat-input',
            templateUrl: './cat-input.component.html',
            styleUrls: ['./cat-input.component.css'],
            animations: [animations_1.Animations.flyInOut10],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return CategoryInputComponent_1; }), multi: true },
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return CategoryInputComponent_1; }), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService, pouchdb_service_1.PouchDBService])
    ], CategoryInputComponent);
    return CategoryInputComponent;
}());
exports.CategoryInputComponent = CategoryInputComponent;
//# sourceMappingURL=cat-input.component.js.map