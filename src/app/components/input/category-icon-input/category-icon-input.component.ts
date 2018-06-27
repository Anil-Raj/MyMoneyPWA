import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Animations } from '../../../animations/animations';


@Component({
    selector: 'app-category-icon-input',
    templateUrl: './category-icon-input.component.html',
    styleUrls: ['./category-icon-input.component.css'],
    animations: [Animations.flyInOut],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CategoryIconInputComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => CategoryIconInputComponent), multi: true }
    ]
})




export class CategoryIconInputComponent implements ControlValueAccessor, OnChanges {

    isIconSelected = false;
    ICONS = [
        '/assets/myicons/ml/ic_category_doctor.png',
        '/assets/myicons/ml/ic_category_donations.png',
        '/assets/myicons/ml/ic_category_education.png',
        '/assets/myicons/ml/ic_category_entertainment.png',
        '/assets/myicons/ml/ic_category_family.png',
        '/assets/myicons/ml/ic_category_foodndrink.png',
        '/assets/myicons/ml/ic_category_friendnlover.png',
        '/assets/myicons/ml/ic_category_give.png',
        '/assets/myicons/ml/ic_category_invest.png',
        '/assets/myicons/ml/ic_category_other_expense.png',
        '/assets/myicons/ml/ic_category_shopping.png',
        '/assets/myicons/ml/ic_category_transport.png',
        '/assets/myicons/ml/ic_category_travel.png',
        '/assets/myicons/ml/icon_6.png',
        '/assets/myicons/ml/icon_8.png',
        '/assets/myicons/ml/icon_9.png',
        '/assets/myicons/ml/icon_10.png',
        '/assets/myicons/ml/icon_11.png',
        '/assets/myicons/ml/icon_15.png',
        '/assets/myicons/ml/icon_17.png',
        '/assets/myicons/ml/icon_33.png',
        '/assets/myicons/ml/icon_35.png',
        '/assets/myicons/ml/icon_38.png',
        '/assets/myicons/ml/icon_54.png',
        '/assets/myicons/ml/icon_59.png',
        '/assets/myicons/ml/icon_63.png',
        '/assets/myicons/ml/icon_125.png',
        '/assets/myicons/ml/icon_126.png',
        '/assets/myicons/ml/icon_130.png',
        '/assets/myicons/ml/icon_131.png',
        '/assets/myicons/ml/icon_135.png',
        '/assets/myicons/ml/icon_137.png',
        '/assets/myicons/ml/icon_138.png',
        '/assets/myicons/ml/icon_139.png',
        '/assets/myicons/ml/icon_141.png',
        '/assets/myicons/ml/icon_withdrawal.png'
    ];
    selectedIcon: any;
    icon_not_selected = '/assets/myicons/ml/icon_not_selected.png';
    constructor() {
    }
    propagateChange: any = () => { };
    validateFn: any = () => { };

    displayIconSelected() {
        this.isIconSelected = true;
    }

    get iconValue() {
        return this.selectedIcon;
    }

    set iconValue(val) {
        this.selectedIcon = val;
        this.propagateChange(val);
    }

    ngOnChanges(inputs) {
        this.propagateChange(this.iconValue);
    }

    writeValue(value) {
        if (value) {
            this.iconValue = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    select(category) {
        this.iconValue = category;
        this.isIconSelected = false;
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }

}
