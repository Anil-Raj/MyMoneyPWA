
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
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
import { CatSelInputComponent } from '../category/cat-sel-input/cat-sel-input.component';
import { MatButtonModule, MatListModule, MatToolbarModule, MatInputModule } from '@angular/material';
import { DatePipe } from '../../pipes/date.pipe';
import { DayPipe } from '../../pipes/day.pipe';
import { MonthPipe } from '../../pipes/month.pipe';
import { YearPipe } from '../../pipes/year.pipe';
import { FormFieldComponent } from './form-field/form-field.component';
import { PouchDBService } from './services/pouchdb.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CategoryModule,
    MatButtonModule, MatListModule, MatToolbarModule, MatInputModule
  ],
  declarations: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionDetailComponent,
    TransactionEditComponent,
    GroupByPipe,
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
