"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DayPipe = /** @class */ (function () {
    function DayPipe() {
    }
    DayPipe.prototype.transform = function (value, args) {
        var date = new Date(value + '');
        var today = new Date();
        var timeDiff = today.getTime() - date.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays === -1) {
            return 'Yesterday';
        }
        switch (date.getDay()) {
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thurday';
            case 5: return 'Friday';
            case 6: return 'Saturday';
            case 0: return 'Sunday';
        }
    };
    DayPipe = __decorate([
        core_1.Pipe({
            name: 'day'
        })
    ], DayPipe);
    return DayPipe;
}());
exports.DayPipe = DayPipe;
//# sourceMappingURL=day.pipe.js.map