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
var category_add_component_1 = require("./category-add/category-add.component");
var category_detail_component_1 = require("./category-detail/category-detail.component");
var category_edit_component_1 = require("./category-edit/category-edit.component");
var category_list_component_1 = require("./category-list/category-list.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var group_by_module_1 = require("../../pipes/group-by/group-by.module");
var cat_input_component_1 = require("./cat-input/cat-input.component");
var category_icon_input_component_1 = require("./category-icon-input/category-icon-input.component");
var material_1 = require("@angular/material");
var category_item_component_1 = require("./category-item/category-item.component");
var CategoryModule = /** @class */ (function () {
    function CategoryModule() {
    }
    CategoryModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatInputModule,
                material_1.MatRadioModule,
                material_1.MatListModule,
                material_1.MatButtonModule,
                material_1.MatMenuModule,
                material_1.MatToolbarModule,
                material_1.MatGridListModule,
                group_by_module_1.GroupByModule
            ],
            declarations: [
                category_add_component_1.CategoryAddComponent,
                category_detail_component_1.CategoryDetailComponent,
                category_edit_component_1.CategoryEditComponent,
                category_list_component_1.CategoryListComponent,
                cat_input_component_1.CategoryInputComponent,
                category_icon_input_component_1.CategoryIconInputComponent,
                category_item_component_1.CategoryItemComponent
            ],
            exports: [
                category_add_component_1.CategoryAddComponent,
                category_detail_component_1.CategoryDetailComponent,
                category_edit_component_1.CategoryEditComponent,
                category_list_component_1.CategoryListComponent,
                cat_input_component_1.CategoryInputComponent,
                category_icon_input_component_1.CategoryIconInputComponent,
                category_item_component_1.CategoryItemComponent
            ]
        })
    ], CategoryModule);
    return CategoryModule;
}());
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map