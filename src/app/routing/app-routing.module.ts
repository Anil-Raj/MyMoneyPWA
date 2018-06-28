import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionListComponent} from './../components/transaction/transaction-list/transaction-list.component';
import {TransactionDetailComponent} from './../components/transaction/transaction-detail/transaction-detail.component';
import { TransactionAddComponent } from './../components/transaction/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './../components/transaction/transaction-edit/transaction-edit.component';
import { CategoryListComponent } from './../components/category/category-list/category-list.component';
import { TrendComponent } from './../components/trend/trend.component';
import { DebtComponent } from './../components/debt/debt.component';
import { SettingComponent } from './../components/setting/setting.component';
import { CategoryAddComponent } from './../components/category/category-add/category-add.component';
import { CategoryDetailComponent } from './../components/category/category-detail/category-detail.component';
import { CategoryEditComponent } from './../components/category/category-edit/category-edit.component';
import { FitnessComponent } from './../components/fitness/fitness.component';
import { GoogleSignInComponent } from './../components/google-signin/google-signin.component';
import { AccountListComponent } from '../components/account/account-list/account-list.component';
import { AccountAddComponent } from '../components/account/account-add/account-add.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';

const routes: Routes = [
  { path: 'transaction', component: TransactionListComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'account', component: AccountListComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'transaction/edit/:id', component: TransactionEditComponent },
  { path: 'transaction-add', component: TransactionAddComponent },
  { path: 'account/add', component: AccountAddComponent },
  { path: 'debt', component: DebtComponent },
  { path: 'trend', component: TrendComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'category/edit/:id', component: CategoryEditComponent },
  { path: 'category-add', component: CategoryAddComponent },
  { path: 'settings', component: SettingComponent },
  { path: 'fitness', component: FitnessComponent },
  { path: '', redirectTo: 'transaction', pathMatch: 'full' },
  { path: 'sign-in', component: GoogleSignInComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
