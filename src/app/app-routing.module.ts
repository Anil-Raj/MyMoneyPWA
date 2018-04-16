import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionListComponent} from './core/transaction/transaction-list/transaction-list.component';
import {TransactionDetailComponent} from './core/transaction/transaction-detail/transaction-detail.component';
import { TransactionAddComponent } from './core/transaction/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './core/transaction/transaction-edit/transaction-edit.component';
import { CategoryListComponent } from './core/category/category-list/category-list.component';
import { TrendComponent } from './core/trend/trend.component';
import { DebtComponent } from './core/debt/debt.component';
import { SettingComponent } from './core/setting/setting.component';
import { CategoryAddComponent } from './core/category/category-add/category-add.component';
import { CategoryDetailComponent } from './core/category/category-detail/category-detail.component';
import { CategoryEditComponent } from './core/category/category-edit/category-edit.component';
import { FitnessComponent } from './core/fitness/fitness/fitness.component';
import { GoogleSigninComponent } from './core/google-signin/google-signin.component';

const routes: Routes = [
  { path: 'transaction', component: TransactionListComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'transaction/edit/:id', component: TransactionEditComponent },
  { path: 'transaction-add', component: TransactionAddComponent },
  { path: 'debt', component: DebtComponent },
  { path: 'trend', component: TrendComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'category/edit/:id', component: CategoryEditComponent },
  { path: 'category-add', component: CategoryAddComponent },
  { path: 'settings', component: SettingComponent },
  { path: 'fitness', component: FitnessComponent },
  { path: '', redirectTo: 'transaction', pathMatch: 'full' },
  { path: 'sign-in', component: GoogleSigninComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
