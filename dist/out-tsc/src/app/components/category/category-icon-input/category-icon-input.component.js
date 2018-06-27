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
var CategoryIconInputComponent = /** @class */ (function () {
    function CategoryIconInputComponent(categoryServie, database) {
        this.categoryServie = categoryServie;
        this.database = database;
        this.isIconSelected = false;
        this.ICONS = [
            '/assets/myicons/ml/ic_category_doctor.png',
            '/assets/myicons/ml/ic_category_donations.png',
            '/assets/myicons/ml/ic_category_education.png',
            '/assets/myicons/ml/ic_category_entertainment.png',
            '/assets/myicons/ml/ic_category_family.png',
            '/assets/myicons/ml/ic_category_foodndrink.png',
            '/assets/myicons/ml/ic_category_friendnlover.png',
            '/assets/myicons/ml/ic_category_give.png',
            '/assets/myicons/ml/ic_category_invest.png',
            '/assets/myicons/ml/ic_category_other_expense.png',
            '/assets/myicons/ml/ic_category_shopping.png',
            '/assets/myicons/ml/ic_category_transport.png',
            '/assets/myicons/ml/ic_category_travel.png',
            '/assets/myicons/ml/icon_6.png',
            '/assets/myicons/ml/icon_8.png',
            '/assets/myicons/ml/icon_9.png',
            '/assets/myicons/ml/icon_10.png',
            '/assets/myicons/ml/icon_11.png',
            '/assets/myicons/ml/icon_15.png',
            '/assets/myicons/ml/icon_17.png',
            '/assets/myicons/ml/icon_33.png',
            '/assets/myicons/ml/icon_35.png',
            '/assets/myicons/ml/icon_38.png',
            '/assets/myicons/ml/icon_54.png',
            '/assets/myicons/ml/icon_59.png',
            '/assets/myicons/ml/icon_63.png',
            '/assets/myicons/ml/icon_125.png',
            '/assets/myicons/ml/icon_126.png',
            '/assets/myicons/ml/icon_130.png',
            '/assets/myicons/ml/icon_131.png',
            '/assets/myicons/ml/icon_135.png',
            '/assets/myicons/ml/icon_137.png',
            '/assets/myicons/ml/icon_138.png',
            '/assets/myicons/ml/icon_139.png',
            '/assets/myicons/ml/icon_141.png',
            '/assets/myicons/ml/icon_withdrawal.png'
        ];
        this.icon_not_selected = '/assets/myicons/ml/icon_not_selected.png';
        this.propagateChange = function () { };
        this.validateFn = function () { };
    }
    CategoryIconInputComponent_1 = CategoryIconInputComponent;
    CategoryIconInputComponent.prototype.displayIconSelected = function () {
        this.isIconSelected = true;
    };
    Object.defineProperty(CategoryIconInputComponent.prototype, "iconValue", {
        get: function () {
            return this.selectedIcon;
        },
        set: function (val) {
            this.selectedIcon = val;
            this.propagateChange(val);
        },
        enumerable: true,
        configurable: true
    });
    CategoryIconInputComponent.prototype.ngOnChanges = function (inputs) {
        this.propagateChange(this.iconValue);
    };
    CategoryIconInputComponent.prototype.writeValue = function (value) {
        if (value) {
            this.iconValue = value;
        }
    };
    CategoryIconInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CategoryIconInputComponent.prototype.registerOnTouched = function () { };
    CategoryIconInputComponent.prototype.select = function (category) {
        this.iconValue = category;
        this.isIconSelected = false;
    };
    CategoryIconInputComponent.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    var CategoryIconInputComponent_1;
    CategoryIconInputComponent = CategoryIconInputComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-category-icon-input',
            templateUrl: './category-icon-input.component.html',
            styleUrls: ['./category-icon-input.component.css'],
            animations: [animations_1.Animations.flyInOut],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return CategoryIconInputComponent_1; }), multi: true },
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return CategoryIconInputComponent_1; }), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService, pouchdb_service_1.PouchDBService])
    ], CategoryIconInputComponent);
    return CategoryIconInputComponent;
}());
exports.CategoryIconInputComponent = CategoryIconInputComponent;
//# sourceMappingURL=category-icon-input.component.js.map