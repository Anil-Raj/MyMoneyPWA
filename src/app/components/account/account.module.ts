import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../core-module/material-modules';
import { AccountSelectComponent } from './account-select/account-select.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountAddComponent } from './account-add/account-add.component';
import { CurrencySelectComponent } from './currency-select/currency-select.component';
import { InputModule } from '../input/input.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        InputModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModules

    ],
    declarations: [
        AccountSelectComponent, 
        AccountListComponent, 
        AccountAddComponent,
        CurrencySelectComponent
    ],
    exports: [
        AccountSelectComponent, 
        AccountListComponent,
        CurrencySelectComponent
    ],
})
export class AccountModule { }
