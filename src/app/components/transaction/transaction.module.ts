
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { MaterialModules } from '../../core-module/material-modules';
import { CategoryModule } from '../category/category.module';
import { AccountModule } from '../account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { InputModule } from '../input/input.module';
import { CustomPipeModule } from '../../pipes/custom-pipe.module';


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
        ReactiveFormsModule,
        MaterialModules,
        CategoryModule,
        CustomPipeModule,
        AccountModule,
        InputModule

    ],
    declarations: [
        TransactionListComponent,
        TransactionAddComponent,
        TransactionDetailComponent,
        TransactionEditComponent,
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
