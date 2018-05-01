import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionModule } from './core/transaction/transaction.module';
import { CategoryModule } from './core/category/category.module';
import { MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DebtComponent } from './core/debt/debt.component';
import { TrendComponent } from './core/trend/trend.component';
import { SettingComponent } from './core/setting/setting.component';
import { FitnessModule } from './core/fitness/fitness/fitness.module';
import { GoogleSigninComponent } from './core/google-signin/google-signin.component';
import { AutosizeDirective } from './core/autosize.directive';


@NgModule({
    declarations: [
        AppComponent,
        DebtComponent,
        TrendComponent,
        SettingComponent,
        GoogleSigninComponent,
        AutosizeDirective,
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ComponentsModule,
        TransactionModule,
        CategoryModule,
        FitnessModule,
        MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
