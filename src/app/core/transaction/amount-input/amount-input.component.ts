import { Component, OnInit, forwardRef, ViewChild, ElementRef, Renderer, Renderer2, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as mathjs from 'mathjs';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AmountInputComponent),
    multi: true
};

@Component({
    selector: 'app-amount-input',
    templateUrl: './amount-input.component.html',
    styleUrls: ['./amount-input.component.css'],
    animations: [trigger(
        'vibrate',
        [
            transition('false<=>true', animate(1000, keyframes([
                style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
                style({ transform: 'translate3d(-10px, 0, 0', offset: 0.05 }),
                style({ transform: 'translate3d(10px, 0, 0)', offset: 0.1 }),
                style({ transform: 'translate3d(-10px, 0, 0', offset: 0.15 }),
                style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
                style({ transform: 'translate3d(-10px, 0, 0', offset: 0.25 }),
                style({ transform: 'translate3d(10px, 0, 0)', offset: 0.3 }),
                style({ transform: 'translate3d(-10px, 0, 0', offset: 0.35 }),
                style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
                style({ transform: 'translate3d(-10px, 0, 0', offset: 0.45 }),
                style({ transform: 'translate3d(0, 0, 0)', offset: .5 }),
            ]))),
        ])],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],


})


export class AmountInputComponent implements ControlValueAccessor {


    originalValue: any;
    phoneKeyboard: Array<Array<any>> = [
        [{ key: '1', type: 1, isDisabled: false }, { key: '2', type: 1, isDisabled: false },
        { key: '3', type: 1, isDisabled: false }, { key: 'backspace', type: 0, isDisabled: false }],
        [{ key: '4', type: 1, isDisabled: false }, { key: '5', type: 1, isDisabled: false },
        { key: '6', type: 1, isDisabled: false }, { key: '-', type: 1, isDisabled: false }],
        [{ key: '7', type: 1, isDisabled: false }, { key: '8', type: 1, isDisabled: false },
        { key: '9', type: 1, isDisabled: false }, { key: '+', type: 1, isDisabled: false }],
        [{ key: '/', type: 1, isDisabled: false }, { key: '0', type: 1, isDisabled: false },
        { key: '*', type: 1, isDisabled: false }, { key: 'keyboard_arrow_right', type: 0, isDisabled: false }],
    ];
    enterkey = true;
    computekey = false;
    isVibrate = false;
    private innerValue: any = '';
    displayCustomKeyboard = false;


    private onTouchedCallback: () => void;
    private onChangeCallback: (_: any) => void;


    toggleCustomKeyBoard() {
        this.displayCustomKeyboard = !this.displayCustomKeyboard;
    }
    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }



    select(key) {
        // console.log(item, parseInt(item, 10), this.innerValue);

        try {
            if (key === 'keyboard_arrow_right') {
                this.close();
            } else if (key === '=') {
                if (Infinity == mathjs.eval(this.innerValue)) {
                    console.log('infinity');
                    throw 'a';
                } else {
                    this.value = mathjs.eval(this.innerValue);
                }

            } else if (key === 'backspace') {
                this.value += '';
                this.value = this.value.slice(0, -1);
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                this.value += '';
                const lastchar = this.value.slice(-1);
                if (lastchar === '+' || lastchar === '-' || lastchar === '*' || lastchar === '/') {


                    this.value = this.value.slice(0, -1);
                    this.value += key;
                } else {
                    this.value += key;
                    // this.disableOperatorButtons();
                }
                this.computekey = true;
            } else {
                console.log(this.value);
                this.value = this.value == 0 ? key : this.value + key;
                console.log(parseFloat(this.value));
            }


        } catch (ex) {
            console.log(ex);

            console.log('invalid');
            console.log(this.value);

            // this.value = 0;
            this.computekey = true;
            this.isVibrate = !this.isVibrate;


        }
    }
    disableOperatorButtons(): any {
        this.phoneKeyboard = this.phoneKeyboard.map(row => {
            return row.map(a => {
                if (a.key === '+' || a.key === '-' || a.key === '*' || a.key === '/') {
                    a.isDisabled = true;
                }
                return a;
            });
        });
    }
    enableOperatorsButton() {
        this.phoneKeyboard = this.phoneKeyboard.map(row => {
            return row.map(a => {
                a.isDisabled = false;
                return a;
            });
        });
    }

    close() {

    try {
            console.log(this.value);
            console.log(typeof (this.value));
            console.log(mathjs.eval(this.value));
            this.value = mathjs.eval(this.value);
            console.log(this.value, 'Infinity', this.value === 'Infinity');

            if (this.value === Infinity) {
                throw 'infinity';
            }
            this.displayCustomKeyboard = false;
        } catch (ex) {
            this.isVibrate = !this.isVibrate;
            
        }


    }

}
