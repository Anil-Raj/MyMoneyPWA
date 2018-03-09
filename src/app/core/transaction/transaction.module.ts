
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionService } from './services/transaction.service';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { MatButtonModule, MatListModule, MatToolbarModule, MatInputModule, MatRipple, MatRippleModule } from '@angular/material';
import { DatePipe } from '../../pipes/date.pipe';
import { DayPipe } from '../../pipes/day.pipe';
import { MonthPipe } from '../../pipes/month.pipe';
import { YearPipe } from '../../pipes/year.pipe';
import { FormFieldComponent } from './form-field/form-field.component';
import { PouchDBService } from './services/pouchdb.service';
import { GroupByModule } from '../../pipes/group-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CategoryModule,
    MatButtonModule, MatListModule, MatToolbarModule, MatInputModule, GroupByModule, MatRippleModule
  ],
  declarations: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionDetailComponent,
    TransactionEditComponent,
    DatePipe,
    DayPipe,
    MonthPipe,
    YearPipe,
    FormFieldComponent
  ],
  exports: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionDetailComponent,
    TransactionEditComponent
  ],
  providers: [
    TransactionService,
    CategoryService,
    PouchDBService
  ]
})
export class TransactionModule { }
