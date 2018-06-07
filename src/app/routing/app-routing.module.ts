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
import { GoogleSigninComponent } from './../components/google-signin/google-signin.component';

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
