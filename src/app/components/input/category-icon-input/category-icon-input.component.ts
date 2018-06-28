import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
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
        '/assets/myicons/ml/ic_category_all.png',
        '/assets/myicons/ml/ic_category_award.png',
        '/assets/myicons/ml/ic_category_salary.png',
        '/assets/myicons/ml/ic_category_selling.png',
        '/assets/myicons/ml/ic_category_pharmacy.png',
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
        '/assets/myicons/ml/icon_1.png',
        '/assets/myicons/ml/icon_2.png',
        '/assets/myicons/ml/icon_3.png',
        '/assets/myicons/ml/icon_4.png',
        '/assets/myicons/ml/icon_5.png',
        '/assets/myicons/ml/icon_6.png',
        '/assets/myicons/ml/icon_7.png',
        '/assets/myicons/ml/icon_8.png',
        '/assets/myicons/ml/icon_9.png',
        '/assets/myicons/ml/icon_10.png',
        '/assets/myicons/ml/icon_11.png',
        '/assets/myicons/ml/icon_12.png',
        '/assets/myicons/ml/icon_13.png',
        '/assets/myicons/ml/icon_14.png',
        '/assets/myicons/ml/icon_15.png',
        '/assets/myicons/ml/icon_16.png',
        '/assets/myicons/ml/icon_17.png',
        '/assets/myicons/ml/icon_18.png',
        '/assets/myicons/ml/icon_19.png',
        '/assets/myicons/ml/icon_20.png',
        '/assets/myicons/ml/icon_21.png',
        '/assets/myicons/ml/icon_22.png',
        '/assets/myicons/ml/icon_23.png',
        '/assets/myicons/ml/icon_24.png',
        '/assets/myicons/ml/icon_25.png',
        '/assets/myicons/ml/icon_26.png',
        '/assets/myicons/ml/icon_27.png',
        '/assets/myicons/ml/icon_28.png',
        '/assets/myicons/ml/icon_29.png',
        '/assets/myicons/ml/icon_30.png',
        '/assets/myicons/ml/icon_31.png',
        '/assets/myicons/ml/icon_32.png',
        '/assets/myicons/ml/icon_33.png',
        '/assets/myicons/ml/icon_34.png',
        '/assets/myicons/ml/icon_35.png',
        '/assets/myicons/ml/icon_36.png',
        '/assets/myicons/ml/icon_37.png',
        '/assets/myicons/ml/icon_38.png',
        '/assets/myicons/ml/icon_39.png',
        '/assets/myicons/ml/icon_40.png',
        '/assets/myicons/ml/icon_41.png',
        '/assets/myicons/ml/icon_42.png',
        '/assets/myicons/ml/icon_43.png',
        '/assets/myicons/ml/icon_44.png',
        '/assets/myicons/ml/icon_45.png',
        '/assets/myicons/ml/icon_46.png',
        '/assets/myicons/ml/icon_47.png',
        '/assets/myicons/ml/icon_48.png',
        '/assets/myicons/ml/icon_49.png',
        '/assets/myicons/ml/icon_50.png',
        '/assets/myicons/ml/icon_51.png',
        '/assets/myicons/ml/icon_52.png',
        '/assets/myicons/ml/icon_53.png',
        '/assets/myicons/ml/icon_54.png',
        '/assets/myicons/ml/icon_55.png',
        '/assets/myicons/ml/icon_56.png',
        '/assets/myicons/ml/icon_57.png',
        '/assets/myicons/ml/icon_58.png',
        '/assets/myicons/ml/icon_59.png',
        '/assets/myicons/ml/icon_60.png',
        '/assets/myicons/ml/icon_61.png',
        '/assets/myicons/ml/icon_62.png',
        '/assets/myicons/ml/icon_63.png',
        '/assets/myicons/ml/icon_64.png',
        '/assets/myicons/ml/icon_66.png',
        '/assets/myicons/ml/icon_66.png',
        '/assets/myicons/ml/icon_67.png',
        '/assets/myicons/ml/icon_68.png',
        '/assets/myicons/ml/icon_69.png',
        '/assets/myicons/ml/icon_70.png',
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
