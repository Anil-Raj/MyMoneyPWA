import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionModule } from './components/transaction/transaction.module';
import { CategoryModule } from './components/category/category.module';
import { MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DebtComponent } from './components/debt/debt.component';
import { TrendComponent } from './components/trend/trend.component';
import { SettingComponent } from './components/setting/setting.component';
import { FitnessModule } from './components/fitness/fitness.module';
import { GoogleSignInComponent } from './components/google-signin/google-signin.component';

// import {GoogleSignInComponent} from 'angular-google-signin';
import { AutosizeDirective } from './components/autosize.directive';
import { CoreModule } from './core-module/core.module';
import { AutoSizeDirective } from './directives/auto-size.directive';


@NgModule({
    declarations: [
        AppComponent,
        DebtComponent,
        TrendComponent,
        SettingComponent,
        GoogleSignInComponent,
        // MyGoogleSigninComponent,
        AutosizeDirective,

        // AutoSizeDirective,
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        CoreModule,
        ReactiveFormsModule,
        AppRoutingModule,
        LayoutModule,
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
