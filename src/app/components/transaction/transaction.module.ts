
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { CategoryModule } from '../category/category.module';
import {
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatRipple,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    MatIcon,
    MatNativeDateModule,
    MatDatepickerModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '../../pipes/date/date.pipe';
import { DayPipe } from '../../pipes/day/day.pipe';
import { MonthPipe } from '../../pipes/month/month.pipe';
import { YearPipe } from '../../pipes/year/year.pipe';
import { GroupByModule } from '../../pipes/group-by/group-by.module';
import { AccountModule } from '../account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { BrowserModule } from '@angular/platform-browser';
import { AutoSizeModule } from '../../directives/auto-size.directive';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { InputModule } from '../input/input.module';


export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { velocity: 0.4, threshold: 20 } // override default settings
    }
}


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatButtonModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRippleModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        ReactiveFormsModule,
        CategoryModule,
        GroupByModule,
        AccountModule,
        InputModule

    ],
    declarations: [
        TransactionListComponent,
        TransactionAddComponent,
        TransactionDetailComponent,
        TransactionEditComponent,
        DatePipe,
        DayPipe,
        MonthPipe,
        YearPipe,
    ],
    exports: [
        TransactionListComponent,
        TransactionAddComponent,
        TransactionDetailComponent,
        TransactionEditComponent,
    ],
    providers: [{
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
    }],
})

export class TransactionModule { }
