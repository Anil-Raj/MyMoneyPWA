import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Currency } from '../../../Models/Currency';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { PouchDBService } from '../../../services/pouchdb.service';

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
  currencies: any = [];
  selectedCurrency: any;
  icon_not_selected = '/assets/myicons/ml/icon_not_selected.png';
  constructor(private database: PouchDBService) {
      // this.currencyServie.awaiCategories().subscribe(a => this.currencies  = a);
      this.currencies = Currency.options();
          console.log(this.currencies[0]);

  }

  ngOnInit() {

    console.log(Currency.getAll());

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
          this.counterValue = value;
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

  validate(c: FormControl) {
      return this.validateFn(c);
  }
}
