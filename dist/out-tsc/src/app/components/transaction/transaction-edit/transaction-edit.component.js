"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var sidebar_service_1 = require("../../../services/sidebar.service");
var transaction_service_1 = require("../../../services/transaction.service");
var Transaction_1 = require("../../../Models/Transaction");
var Kind_1 = require("../../../Models/Kind");
var transaction_1 = require("../../../storage/transaction");
var animations_1 = require("../../../animations/animations");
var TransactionEditComponent = /** @class */ (function () {
    function TransactionEditComponent(service, router, route, location, navService) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.location = location;
        this.navService = navService;
        this.kindEnum = Kind_1.KindEnum;
    }
    TransactionEditComponent.prototype.ngOnInit = function () {
        this.editTransactionForm = new forms_1.FormGroup({
            note: new forms_1.FormControl(''),
            amount: new forms_1.FormControl(''),
            category: new forms_1.FormControl(''),
            time: new forms_1.FormControl(new Date())
        });
        this.getTransaction();
    };
    TransactionEditComponent.prototype.getTransaction = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        transaction_1.default.load(id).then(function (transaction) {
            console.log(transaction);
            _this.transaction = Transaction_1.Transaction.toForm(transaction);
            _this.editTransactionForm.patchValue(_this.transaction);
        });
    };
    TransactionEditComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var value = _a.value;
        value = __assign({}, this.transaction, value);
        var tr = Transaction_1.Transaction.fromForm(value);
        transaction_1.default.save(tr).then(function () {
            _this.router.navigate(['/transaction/']);
        });
    };
    TransactionEditComponent.prototype.back = function () {
        this.location.back();
    };
    TransactionEditComponent = __decorate([
        core_1.Component({
            selector: 'app-transaction-edit',
            templateUrl: './transaction-edit.component.html',
            styleUrls: ['./transaction-edit.component.css'],
            animations: [animations_1.Animations.slideLeft],
        }),
        __metadata("design:paramtypes", [transaction_service_1.TransactionService,
            router_1.Router,
            router_1.ActivatedRoute,
            common_1.Location,
            sidebar_service_1.SidebarService])
    ], TransactionEditComponent);
    return TransactionEditComponent;
}());
exports.TransactionEditComponent = TransactionEditComponent;
//# sourceMappingURL=transaction-edit.component.js.map