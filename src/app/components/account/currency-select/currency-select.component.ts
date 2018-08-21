import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Currency } from '../../../Models/Currency';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.css'],

  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CurrencySelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CurrencySelectComponent), multi: true }
]
})
export class CurrencySelectComponent implements OnInit, ControlValueAccessor {
  @Input() currency: any;
  isSelectCurrency = false;
  selectedCurrency: any;
  icon_currency = '/assets/myicons/ml/currency.png';
    filteredItems: any;
  constructor() {
      this.filteredItems = Currency.options();
  }

  ngOnInit() {

}
  
  propagateChange: any = () => { };
  validateFn: any = () => { };

  displaySelectCurrency() {
      this.isSelectCurrency = true;
  }

  get counterValue() {
      return this.selectedCurrency;
  }

  set counterValue(val) {
      this.selectedCurrency = val;
      this.propagateChange(val);
  }

  ngOnChanges(inputs) {
      this.propagateChange(this.counterValue);
  }

  writeValue(value) {
      if (value) {
          this.selectedCurrency = value;
      }
  }

  registerOnChange(fn) {
      this.propagateChange = fn;
  }

  registerOnTouched() { }

  select(currency) {
      this.counterValue = currency;
      this.isSelectCurrency = false;
  }

  validate(c) {
      return this.validateFn(c);
  }
  filterItem(value){
    if(!value)  this.filteredItems = Currency.options();; //when nothing has typed
    this.filteredItems =  Currency.options().filter(
       item => item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
    )

  }
}
