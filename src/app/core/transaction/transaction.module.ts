import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionService } from './services/transaction.service';
import { GroupByPipe } from '../../pipes/group-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
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
  providers: [TransactionService]
})
export class TransactionModule { }
