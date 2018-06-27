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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var Transaction_1 = require("../../../Models/Transaction");
var Kind_1 = require("../../../Models/Kind");
var transaction_1 = require("../../../storage/transaction");
var animations_1 = require("../../../animations/animations");
var TransactionDetailComponent = /** @class */ (function () {
    function TransactionDetailComponent(route, router, location) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.kindEnum = Kind_1.KindEnum;
    }
    TransactionDetailComponent.prototype.ngOnInit = function () {
        this.getTransaction();
    };
    TransactionDetailComponent.prototype.getTransaction = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        transaction_1.default.load(id).then(function (tr) {
            _this.transaction = Transaction_1.Transaction.toForm(tr);
        });
    };
    TransactionDetailComponent.prototype.edit = function () {
    };
    TransactionDetailComponent.prototype.remove = function (tr) {
        var _this = this;
        transaction_1.default.remove(tr._id).then(function (a) {
            _this.router.navigate(['/transaction/']);
        });
    };
    TransactionDetailComponent.prototype.back = function () {
        this.router.navigate(['/transaction']);
    };
    TransactionDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-transaction-detail',
            templateUrl: './transaction-detail.component.html',
            styleUrls: ['./transaction-detail.component.css'],
            animations: [animations_1.Animations.slideUp],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            common_1.Location])
    ], TransactionDetailComponent);
    return TransactionDetailComponent;
}());
exports.TransactionDetailComponent = TransactionDetailComponent;
//# sourceMappingURL=transaction-detail.component.js.map