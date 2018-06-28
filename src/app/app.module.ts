import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule, MatFormField, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';



import { environment } from '../environments/environment';



import { CoreModule } from './core-module/core.module';
import { TransactionModule } from './components/transaction/transaction.module';
import { AccountModule } from './components/account/account.module'
import { CategoryModule } from './components/category/category.module';
import { FitnessModule } from './components/fitness/fitness.module';
import { LayoutModule } from './layout/layout.module';

import { DebtComponent } from './components/debt/debt.component';
import { TrendComponent } from './components/trend/trend.component';
import { SettingComponent } from './components/setting/setting.component';


import { AutosizeDirective } from './components/autosize.directive';


import { GoogleSignInComponent } from './components/google-signin/google-signin.component';


import { AppRoutingModule } from './routing/app-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InputModule } from './components/input/input.module';



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
        AutosizeDirective,
        WelcomeComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        CoreModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AppRoutingModule,
        LayoutModule,
        TransactionModule,
        AccountModule,
        CategoryModule,
        FitnessModule,
        InputModule,
        MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule,
        CommonModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }
    // , {
    //     provide: HAMMER_GESTURE_CONFIG,
    //     useClass: MyHammerConfig
    // }
],
    bootstrap: [AppComponent]
})
export class AppModule { }
