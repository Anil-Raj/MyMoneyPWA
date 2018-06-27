"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var currency_service_1 = require("./currency.service");
describe('CurrencyService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [currency_service_1.CurrencyService]
        });
    });
    it('should be created', testing_1.inject([currency_service_1.CurrencyService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=currency.service.spec.js.map