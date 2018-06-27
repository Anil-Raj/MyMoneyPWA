"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var sidebar_service_1 = require("./sidebar.service");
describe('SidebarService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [sidebar_service_1.SidebarService]
        });
    });
    it('should be created', testing_1.inject([sidebar_service_1.SidebarService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=sidebar.service.spec.js.map