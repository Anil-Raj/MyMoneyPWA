import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';
import { CategoryService } from '../services/category.service';
import { PouchDBService } from '../services/pouchdb.service';
import { TransactionService } from '../services/transaction.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      SidebarService,
      PouchDBService,
      CategoryService,
      TransactionService
    ]
})
export class CoreModule { }
