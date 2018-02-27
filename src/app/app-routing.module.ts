import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionListComponent} from './core/transaction/transaction-list/transaction-list.component';
import {TransactionDetailComponent} from './core/transaction/transaction-detail/transaction-detail.component';
import { TransactionAddComponent } from './core/transaction/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './core/transaction/transaction-edit/transaction-edit.component';

const routes: Routes = [
  { path: 'transaction', component: TransactionListComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'transaction/edit/:id', component: TransactionEditComponent },
  { path: 'transaction-add', component: TransactionAddComponent },
  // { path: 'debt', component: DebtsComponent },
  // { path: 'trend', component: TrendsComponent },
  // { path: 'category', component: CategoriesComponent },
  // { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'transaction', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
