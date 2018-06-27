"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var transaction_service_1 = require("./transaction.service");
describe('TransactionService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [transaction_service_1.TransactionService]
        });
    });
    it('should be created', testing_1.inject([transaction_service_1.TransactionService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=transaction.service.spec.js.map