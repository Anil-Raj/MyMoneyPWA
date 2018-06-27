"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var category_service_1 = require("./category.service");
describe('CategoryService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [category_service_1.CategoryService]
        });
    });
    it('should be created', testing_1.inject([category_service_1.CategoryService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=category.service.spec.js.map