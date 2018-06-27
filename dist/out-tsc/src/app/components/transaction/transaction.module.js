"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var transaction_list_component_1 = require("./transaction-list/transaction-list.component");
var transaction_add_component_1 = require("./transaction-add/transaction-add.component");
var transaction_detail_component_1 = require("./transaction-detail/transaction-detail.component");
var transaction_edit_component_1 = require("./transaction-edit/transaction-edit.component");
var category_module_1 = require("../category/category.module");
var material_1 = require("@angular/material");
var icon_1 = require("@angular/material/icon");
var date_pipe_1 = require("../../pipes/date/date.pipe");
var day_pipe_1 = require("../../pipes/day/day.pipe");
var month_pipe_1 = require("../../pipes/month/month.pipe");
var year_pipe_1 = require("../../pipes/year/year.pipe");
var group_by_module_1 = require("../../pipes/group-by/group-by.module");
var account_module_1 = require("../account/account.module");
var animations_1 = require("@angular/platform-browser/animations");
var amount_input_component_1 = require("./amount-input/amount-input.component");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_2 = require("@angular/platform-browser");
var MyHammerConfig = /** @class */ (function (_super) {
    __extends(MyHammerConfig, _super);
    function MyHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            'swipe': { velocity: 0.4, threshold: 20 } // override default settings
        };
        return _this;
    }
    return MyHammerConfig;
}(platform_browser_2.HammerGestureConfig));
exports.MyHammerConfig = MyHammerConfig;
var TransactionModule = /** @class */ (function () {
    function TransactionModule() {
    }
    TransactionModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                material_1.MatDatepickerModule,
                material_1.MatInputModule,
                material_1.MatNativeDateModule,
                material_1.MatButtonModule,
                material_1.MatListModule,
                material_1.MatToolbarModule,
                material_1.MatInputModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                material_1.MatRippleModule,
                material_1.MatCardModule,
                material_1.MatTabsModule,
                icon_1.MatIconModule,
                forms_1.ReactiveFormsModule,
                category_module_1.CategoryModule,
                group_by_module_1.GroupByModule,
                account_module_1.AccountModule
            ],
            declarations: [
                transaction_list_component_1.TransactionListComponent,
                transaction_add_component_1.TransactionAddComponent,
                transaction_detail_component_1.TransactionDetailComponent,
                transaction_edit_component_1.TransactionEditComponent,
                date_pipe_1.DatePipe,
                day_pipe_1.DayPipe,
                month_pipe_1.MonthPipe,
                year_pipe_1.YearPipe,
                // FormFieldComponent,
                amount_input_component_1.AmountInputComponent
            ],
            exports: [
                transaction_list_component_1.TransactionListComponent,
                transaction_add_component_1.TransactionAddComponent,
                transaction_detail_component_1.TransactionDetailComponent,
                transaction_edit_component_1.TransactionEditComponent
            ],
            providers: [{
                    provide: platform_browser_2.HAMMER_GESTURE_CONFIG,
                    useClass: MyHammerConfig
                }],
        })
    ], TransactionModule);
    return TransactionModule;
}());
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map