import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectComponent } from './account-select/account-select.component';
import { MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    declarations: [AccountSelectComponent],
    exports: [AccountSelectComponent]
})
export class AccountModule { }
