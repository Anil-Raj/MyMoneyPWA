import { Component, OnInit, forwardRef, ViewChild, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as mathjs from 'mathjs';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AmountInputComponent),
    multi: true
};

@Component({
    selector: 'app-amount-input',
    templateUrl: './amount-input.component.html',
    styleUrls: ['./amount-input.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]

})


export class AmountInputComponent implements ControlValueAccessor {

    phoneKeyboard: Array<Array<any>> = [
        [{ key: '1', type: 1, isDisabled: false }, { key: '2', type: 1, isDisabled: false },
        { key: '3', type: 1, isDisabled: false }, { key: 'backspace', type: 0, isDisabled: false }],
        [{ key: '4', type: 1, isDisabled: false }, { key: '5', type: 1, isDisabled: false },
        { key: '6', type: 1, isDisabled: false }, { key: '-', type: 1, isDisabled: false }],
        [{ key: '7', type: 1, isDisabled: false }, { key: '8', type: 1, isDisabled: false },
        { key: '9', type: 1, isDisabled: false }, { key: '+', type: 1, isDisabled: false }],
        [{ key: '/', type: 1, isDisabled: false }, { key: '0', type: 1, isDisabled: false },
        { key: '*', type: 1, isDisabled: false }, { key: '=', type: 1, isDisabled: false }],
    ];
    enterkey = true;
    computekey = false;

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
            // console.log(mathjs.eval(this.innerValue + item));
            // console.log(item);
            // console.log(this.innerValue);
            // console.log(this.value);
            // if (item === '=') {
            //     console.log('inside ');
            //     console.log(mathjs.eval(this.innerValue));
            //     this.value = mathjs.eval(this.innerValue);
            //     this.innerValue = this.value + '';
            //     this.writeValue(mathjs.eval(this.innerValue));
            //     this.computekey = false;
            // } else if (item === 'Backspace') {
            //     this.value = this.innerValue.slice(0, -1);
            //     this.innerValue = this.value;
            //     this.writeValue(this.innerValue);

            // } else if (item === '+' || item === '-' || item === '*' || item === '/') {


            //     const lastchar = this.innerValue.slice(-1);
            //     if (lastchar === '+' || lastchar === '-' || lastchar === '*' || lastchar === '/') {
            //         console.log('lastchar', lastchar);
            //         this.innerValue = this.innerValue.slice(0, -1);
            //         this.innerValue += item;
            //         this.writeValue(this.innerValue);
            //         console.log(this.innerValue);

            //         this.writeValue(this.innerValue);

            //     } else {
            //         console.log(item);
            //         console.log(this.innerValue);
            //         this.innerValue = this.innerValue + item;
            //         this.writeValue(this.innerValue);

            //     }
            // } else {
            //     this.innerValue = this.innerValue + item;
            //     this.writeValue(this.innerValue);
            //     console.log(this.innerValue);
            //     console.log(mathjs.eval(this.innerValue));
            //     // this.value = mathjs.eval(this.strinvalue);
            // }



            if (key === '=') {
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
            } else {
                console.log(this.value);

                this.value = this.value == 0 ? key : this.value + key;
                console.log(parseFloat(this.value));


            }


        } catch (ex) {
            console.log(ex);

            console.log('invalid');
            this.value = 0;
            this.computekey = true;


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
        console.log(this.value);
        console.log(typeof (this.value));
        console.log(mathjs.eval(this.value));
        try {
            this.value = mathjs.eval(this.value);
            console.log(this.value, 'Infinity', this.value === 'Infinity');

            if (this.value === Infinity) {
                throw 'infinity';
            }
        } catch (ex) {
            this.value = 0;
        }
        this.displayCustomKeyboard = false;
    }

}
