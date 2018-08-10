import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Animations } from '../../../animations/animations';
import { CategoryService } from '../../../storage/category';


@Component({
    selector: 'app-cat-input',
    templateUrl: './cat-input.component.html',
    styleUrls: ['./cat-input.component.css'],

    animations: [Animations.flyInOut10],

    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CategoryInputComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => CategoryInputComponent), multi: true }
    ]
})
export class CategoryInputComponent implements ControlValueAccessor, OnChanges, OnInit {
    @Input() category: any;
    isSelectCategory = false;
    categories: any = [];
    selectedCategory: any;
    tabs=['Income','Expense'];
    icon_not_selected = '/assets/myicons/ml/icon_not_selected.png';
    constructor(private categoriesService: CategoryService) {
        this.categories = this.categoriesService.loadAll().then((categories) => {
            this.categories = categories;
            console.log(categories);
        });
    }

    ngOnInit() {
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
