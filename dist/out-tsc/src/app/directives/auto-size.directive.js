"use strict";
// import { Directive } from '@angular/core';
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
// @Directive({
//   selector: '[autosize]'
// })
// export class AutoSizeDirective {
//   constructor() { }
// }
var core_1 = require("@angular/core");
var MAX_LOOKUP_RETRIES = 3;
var AutoSizeDirective = /** @class */ (function () {
    function AutoSizeDirective(element) {
        this.element = element;
        this.textAreaEl = this.element.nativeElement;
    }
    AutoSizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutoSizeDirective.prototype.ngAfterContentChecked = function () {
        this.adjust();
    };
    AutoSizeDirective.prototype.adjust = function () {
        if (this.textAreaEl) {
            this.textAreaEl.style.overflow = 'hidden';
            this.textAreaEl.style.height = 'auto';
            this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
        }
    };
    __decorate([
        core_1.HostListener('input', ['$event.target']),
        __metadata("design:type", Object)
    ], AutoSizeDirective.prototype, "textAreaEl", void 0);
    AutoSizeDirective = __decorate([
        core_1.Directive({
            selector: '[autosize]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], AutoSizeDirective);
    return AutoSizeDirective;
}());
exports.AutoSizeDirective = AutoSizeDirective;
var AutoSizeModule = /** @class */ (function () {
    function AutoSizeModule() {
    }
    AutoSizeModule = __decorate([
        core_1.NgModule({
            declarations: [AutoSizeDirective],
            exports: [AutoSizeDirective]
        })
    ], AutoSizeModule);
    return AutoSizeModule;
}());
exports.AutoSizeModule = AutoSizeModule;
//# sourceMappingURL=auto-size.directive.js.map