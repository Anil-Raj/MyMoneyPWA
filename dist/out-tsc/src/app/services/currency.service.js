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
var http_1 = require("@angular/common/http");
var environment_1 = require("../../environments/environment");
require("rxjs/add/operator/map");
var CurrencyService = /** @class */ (function () {
    function CurrencyService(http) {
        this.http = http;
        this.exchangeServiceUrl = environment_1.environment.EXCHANGE_URL;
        this.exchangeApiKey = environment_1.environment.EXCHANGE_KEY;
    }
    CurrencyService.prototype.fetchExchangeRates = function (base, target) {
        var url = this.exchangeServiceUrl + '?from=' + base + '&to=' + target + '&quantity=1&api_key=' + this.exchangeApiKey;
        return this.http.get(url).map(function (data) { return data; });
    };
    CurrencyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CurrencyService);
    return CurrencyService;
}());
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map