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
var Transaction_1 = require("../../../Models/Transaction");
var Kind_1 = require("../../../Models/Kind");
var transaction_service_1 = require("../../../services/transaction.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var sidebar_service_1 = require("../../../services/sidebar.service");
var transaction_1 = require("../../../storage/transaction");
var accounts_1 = require("../../../storage/accounts");
var TransactionAddComponent = /** @class */ (function () {
    function TransactionAddComponent(service, router, location, navService) {
        var _this = this;
        this.service = service;
        this.router = router;
        this.location = location;
        this.navService = navService;
        this.kindEnum = Kind_1.KindEnum;
        this.navService.account.subscribe(function (ac) {
            _this.selectedAccount = ac;
            console.log(_this.selectedAccount);
        });
    }
    TransactionAddComponent.prototype.ngOnInit = function () {
        this.addTransactionForm = new forms_1.FormGroup({
            note: new forms_1.FormControl(),
            amount: new forms_1.FormControl('0', forms_1.Validators.required),
            category: new forms_1.FormControl('', forms_1.Validators.required),
            time: new forms_1.FormControl(Date(), forms_1.Validators.required)
        });
    };
    TransactionAddComponent.prototype.onSubmit = function (_a) {
        var _this = this;
        var valid = _a.valid, value = _a.value;
        if (valid) {
            console.log(this.selectedAccount);
            value.currency = 'USD';
            value.accountId = this.selectedAccount.id;
            var tr = Transaction_1.Transaction.fromForm(value);
            transaction_1.default.save(tr).then(function (a) {
                console.log(a);
                _this.router.navigate(['/transaction/']);
            });
            var mutation = {
                accountId: this.selectedAccount.id,
                amount: tr.amount,
                currency: 'USD'
            };
            var acc = accounts_1.default.mutateBalance(mutation);
            console.log('mutated acc', acc);
            // this.database.put_acc(acc);
        }
    };
    TransactionAddComponent.prototype.back = function () {
        this.location.back();
    };
    TransactionAddComponent = __decorate([
        core_1.Component({
            selector: 'app-transaction-add',
            templateUrl: './transaction-add.component.html',
            styleUrls: ['./transaction-add.component.css'],
            animations: [
                core_1.trigger('slideUp', [
                    core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(100%)' }),
                        core_1.animate('.3s ease-out')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(500, core_1.style({ transform: 'translateY(-100%)' }))
                    ])
                ])
            ],
        }),
        __metadata("design:paramtypes", [transaction_service_1.TransactionService,
            router_1.Router,
            common_1.Location,
            sidebar_service_1.SidebarService])
    ], TransactionAddComponent);
    return TransactionAddComponent;
}());
exports.TransactionAddComponent = TransactionAddComponent;
//# sourceMappingURL=transaction-add.component.js.map