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
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var service_worker_1 = require("@angular/service-worker");
var app_component_1 = require("./app.component");
var common_2 = require("@angular/common");
var platform_browser_2 = require("@angular/platform-browser");
var environment_1 = require("../environments/environment");
var core_module_1 = require("./core-module/core.module");
var transaction_module_1 = require("./components/transaction/transaction.module");
var account_module_1 = require("./components/account/account.module");
var category_module_1 = require("./components/category/category.module");
var fitness_module_1 = require("./components/fitness/fitness.module");
var layout_module_1 = require("./layout/layout.module");
var debt_component_1 = require("./components/debt/debt.component");
var trend_component_1 = require("./components/trend/trend.component");
var setting_component_1 = require("./components/setting/setting.component");
var autosize_directive_1 = require("./components/autosize.directive");
var google_signin_component_1 = require("./components/google-signin/google-signin.component");
var app_routing_module_1 = require("./routing/app-routing.module");
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                debt_component_1.DebtComponent,
                trend_component_1.TrendComponent,
                setting_component_1.SettingComponent,
                google_signin_component_1.GoogleSignInComponent,
                autosize_directive_1.AutosizeDirective,
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                core_module_1.CoreModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                layout_module_1.LayoutModule,
                transaction_module_1.TransactionModule,
                account_module_1.AccountModule,
                category_module_1.CategoryModule,
                fitness_module_1.FitnessModule,
                material_1.MatButtonModule, material_1.MatListModule, material_1.MatToolbarModule, material_1.MatMenuModule,
                service_worker_1.ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment_1.environment.production })
            ],
            providers: [{
                    provide: common_2.LocationStrategy,
                    useClass: common_2.HashLocationStrategy
                }
                // , {
                //     provide: HAMMER_GESTURE_CONFIG,
                //     useClass: MyHammerConfig
                // }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map