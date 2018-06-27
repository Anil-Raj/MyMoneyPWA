import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectComponent } from './account-select/account-select.component';
import { AccountListComponent } from './account-list/account-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyService } from '../../services/currency.service';
import { AccountAddComponent } from './account-add/account-add.component';
import {
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
} from '@angular/material';
import { CurrencySelectComponent } from './currency-select/currency-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionModule } from '../transaction/transaction.module';
import { InputModule } from '../input/input.module';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        InputModule
    ],
    declarations: [AccountSelectComponent, AccountListComponent, AccountAddComponent,CurrencySelectComponent],
    exports: [AccountSelectComponent, AccountListComponent],
    providers: [CurrencyService]
})
export class AccountModule { }
