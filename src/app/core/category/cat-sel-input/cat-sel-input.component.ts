import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { CategoryService } from '../category.service';
import { PouchDBService } from '../../transaction/services/pouchdb.service';

@Component({
    selector: 'app-cat-sel-input',
    templateUrl: './cat-sel-input.component.html',
    styleUrls: ['./cat-sel-input.component.css'],

    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CatSelInputComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => CatSelInputComponent), multi: true }
    ]
})
export class CatSelInputComponent implements ControlValueAccessor, OnChanges {
    isSelectCategory = false;
    categories: any;
    selectedCategory: any;
    constructor(private categoryServie: CategoryService, private database: PouchDBService) {
        // this.categoryServie.awaiCategories().subscribe(a => this.categories  = a);
        this.categories = this.database.getDoc('category_').subscribe((categories) => {
            this.categories = categories.rows.map(row => {
                return row.values;
            });
        });
        // console.log(this.categories);

       }
    propagateChange: any = () => { };
    validateFn: any = () => { };

    displaySelectCategory() {
        this.isSelectCategory = true;
    }

    get counterValue() {
        return this.selectedCategory;
    }

    set counterValue(val) {
        this.selectedCategory = val;
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

    select(category) {
        this.counterValue = category;
        this.isSelectCategory = false;
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }
}
