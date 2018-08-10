import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';
import { TransactionService } from '../storage/transaction';
import { CategoryService } from '../storage/category';
import { AccountService } from '../storage/accounts';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      SidebarService,
      CategoryService,
      TransactionService,
      AccountService
    ]
})
export class CoreModule { }
