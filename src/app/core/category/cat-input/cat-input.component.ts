import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { CategoryService } from '../category.service';
import { PouchDBService } from '../../transaction/services/pouchdb.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-cat-input',
    templateUrl: './cat-input.component.html',
    styleUrls: ['./cat-input.component.css'],

    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate(500)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ],

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
    icon_not_selected = '/assets/myicons/ml/icon_not_selected.png';
    constructor(private categoryServie: CategoryService, private database: PouchDBService) {
        // this.categoryServie.awaiCategories().subscribe(a => this.categories  = a);
        this.categories = this.database.getDoc('category_').subscribe((categories) => {
            this.categories = categories.rows.map(row => {
                return row.doc;
            });
        });
    }

    ngOnInit() {
        console.log(this.category);
        // this.selectedCategory = this.category.category.value;
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
