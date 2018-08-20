import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HammerGestureConfig } from '@angular/platform-browser';

import { environment } from '../environments/environment';

import { CoreModule } from './core-module/core.module';
import { TransactionModule } from './components/transaction/transaction.module';
import { AccountModule } from './components/account/account.module'
import { CategoryModule } from './components/category/category.module';
import { LayoutModule } from './layout/layout.module';
import { InputModule } from './components/input/input.module';
import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';
import { DebtComponent } from './components/debt/debt.component';
import { TrendComponent } from './components/trend/trend.component';
import { SettingComponent } from './components/setting/setting.component';
import { GoogleSignInComponent } from './components/google-signin/google-signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './core-module/material-modules';
import { TransactionsResolver } from './routing/transaction.resolver';
import { AccountResolver } from './routing/account.resolver';


export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { velocity: 0.4, threshold: 20 } // override default settings
    }
}

@NgModule({
    declarations: [
        AppComponent,
        DebtComponent,
        TrendComponent,
        SettingComponent,
        GoogleSignInComponent,
        WelcomeComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        BrowserModule,
        RouterModule, 
        BrowserAnimationsModule,
        FormsModule,
        CoreModule,
        ReactiveFormsModule,
        MaterialModules,
        AppRoutingModule,
        LayoutModule,
        TransactionModule,
        AccountModule,
        CategoryModule,
        InputModule,

        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },TransactionsResolver,AccountResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
