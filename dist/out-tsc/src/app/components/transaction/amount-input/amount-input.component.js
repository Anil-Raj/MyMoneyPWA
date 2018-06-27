"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mathjs = require("mathjs");
var animations_1 = require("../../../animations/animations");
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AmountInputComponent; }),
    multi: true
};
var AmountInputComponent = /** @class */ (function () {
    function AmountInputComponent() {
        this.phoneKeyboard = [
            [{ key: '1', type: 1, isDisabled: false }, { key: '2', type: 1, isDisabled: false },
                { key: '3', type: 1, isDisabled: false }, { key: 'backspace', type: 0, isDisabled: false }],
            [{ key: '4', type: 1, isDisabled: false }, { key: '5', type: 1, isDisabled: false },
                { key: '6', type: 1, isDisabled: false }, { key: '-', type: 1, isDisabled: false }],
            [{ key: '7', type: 1, isDisabled: false }, { key: '8', type: 1, isDisabled: false },
                { key: '9', type: 1, isDisabled: false }, { key: '+', type: 1, isDisabled: false }],
            [{ key: '/', type: 1, isDisabled: false }, { key: '0', type: 1, isDisabled: false },
                { key: '*', type: 1, isDisabled: false }, { key: 'keyboard_arrow_right', type: 0, isDisabled: false }],
        ];
        this.enterkey = true;
        this.computekey = false;
        this.animateInvelidInput = false;
        this.innerValue = '';
        this.displayCustomKeyboard = false;
    }
    AmountInputComponent.prototype.toggleCustomKeyBoard = function () {
        this.displayCustomKeyboard = !this.displayCustomKeyboard;
    };
    Object.defineProperty(AmountInputComponent.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    AmountInputComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    AmountInputComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    AmountInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    AmountInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    AmountInputComponent.prototype.select = function (key) {
        this.animateInvelidInput = false;
        console.log(key);
        try {
            if (key === 'keyboard_arrow_right') {
                this.close();
            }
            else if (key === '=') {
                if (Infinity === mathjs.eval(this.innerValue)) {
                    console.log('infinity');
                    throw Infinity;
                }
                else {
                    this.value = mathjs.eval(this.innerValue);
                }
            }
            else if (key === 'backspace') {
                this.value += '';
                this.value = this.value.slice(0, -1);
                this.value = this.value === '' ? '0' : this.value;
            }
            else if (key === '+' || key === '-' || key === '*' || key === '/') {
                this.value += '';
                var lastchar = this.value.slice(-1);
                if (lastchar === '+' || lastchar === '-' || lastchar === '*' || lastchar === '/') {
                    this.value = this.value.slice(0, -1);
                    this.value += key;
                }
                else {
                    this.value += key;
                    // this.disableOperatorButtons();
                }
                this.computekey = true;
            }
            else {
                console.log(this.value);
                this.value = this.value === '0' ? key : this.value + key;
                console.log(parseFloat(this.value));
            }
        }
        catch (ex) {
            console.log(ex);
            console.log('invalid');
            console.log(this.value);
            // this.value = 0;
            this.computekey = true;
            this.animateInvelidInput = true;
        }
    };
    AmountInputComponent.prototype.disableOperatorButtons = function () {
        this.phoneKeyboard = this.phoneKeyboard.map(function (row) {
            return row.map(function (a) {
                if (a.key === '+' || a.key === '-' || a.key === '*' || a.key === '/') {
                    a.isDisabled = true;
                }
                return a;
            });
        });
    };
    AmountInputComponent.prototype.enableOperatorsButton = function () {
        this.phoneKeyboard = this.phoneKeyboard.map(function (row) {
            return row.map(function (a) {
                a.isDisabled = false;
                return a;
            });
        });
    };
    AmountInputComponent.prototype.close = function () {
        this.animateInvelidInput = false;
        try {
            console.log(mathjs.eval(this.value));
            this.value = mathjs.eval(this.value);
            if (this.value === Infinity) {
                throw Infinity;
            }
            this.displayCustomKeyboard = false;
        }
        catch (ex) {
            this.animateInvelidInput = true;
        }
    };
    AmountInputComponent = __decorate([
        core_1.Component({
            selector: 'app-amount-input',
            templateUrl: './amount-input.component.html',
            styleUrls: ['./amount-input.component.css'],
            animations: [animations_1.Animations.vibrate],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
        })
    ], AmountInputComponent);
    return AmountInputComponent;
}());
exports.AmountInputComponent = AmountInputComponent;
//# sourceMappingURL=amount-input.component.js.map