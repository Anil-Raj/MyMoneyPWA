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
//   selector: '[appAutosize]'
// })
// export class AutosizeDirective {
//   constructor() { }
// }
var core_1 = require("@angular/core");
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element) {
        this.element = element;
        this.el = element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }
    Object.defineProperty(AutosizeDirective.prototype, "minHeight", {
        get: function () {
            return this._minHeight;
        },
        set: function (val) {
            this._minHeight = val;
            this.updateMinHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutosizeDirective.prototype, "maxHeight", {
        get: function () {
            return this._maxHeight;
        },
        set: function (val) {
            this._maxHeight = val;
            this.updateMaxHeight();
        },
        enumerable: true,
        configurable: true
    });
    AutosizeDirective.prototype.onResize = function (textArea) {
        // Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this._clientWidth) {
            return;
        }
        ;
        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    };
    AutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutosizeDirective.prototype.ngAfterViewInit = function () {
        // set element resize allowed manually by user
        var style = window.getComputedStyle(this.el, null);
        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        }
        else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        // run first adjust
        this.adjust();
    };
    AutosizeDirective.prototype.adjust = function () {
        // perform height adjustments after input changes, if height is different
        if (this.el.style.height == this.element.nativeElement.scrollHeight + 'px') {
            return;
        }
        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + 'px';
    };
    AutosizeDirective.prototype.updateMinHeight = function () {
        // Set textarea min height if input defined
        this.el.style.minHeight = this._minHeight + 'px';
    };
    AutosizeDirective.prototype.updateMaxHeight = function () {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this._maxHeight + 'px';
    };
    __decorate([
        core_1.Input('minHeight'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AutosizeDirective.prototype, "minHeight", null);
    __decorate([
        core_1.Input('maxHeight'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AutosizeDirective.prototype, "maxHeight", null);
    __decorate([
        core_1.HostListener('window:resize', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], AutosizeDirective.prototype, "onResize", null);
    __decorate([
        core_1.HostListener('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], AutosizeDirective.prototype, "onInput", null);
    AutosizeDirective = __decorate([
        core_1.Directive({
            selector: 'textarea [appAutosize]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], AutosizeDirective);
    return AutosizeDirective;
}());
exports.AutosizeDirective = AutosizeDirective;
//# sourceMappingURL=autosize.directive.js.map