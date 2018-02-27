import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionService } from './services/transaction.service';
import { GroupByPipe } from '../../pipes/group-by.pipe';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { MatButtonModule, MatListModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CategoryModule,
    MatButtonModule, MatListModule, MatToolbarModule
  ],
  declarations: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionDetailComponent,
    TransactionEditComponent,
    GroupByPipe
  ],
  exports: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionDetailComponent,
    TransactionEditComponent
  ],
  providers: [
    TransactionService,
    CategoryService
  ]
})
export class TransactionModule { }
