import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../category/category.service';
import { TransactionService } from '../services/transaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PouchDBService } from '../services/pouchdb.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {


  private transaction: Transaction = null;

  addTransactionForm: FormGroup;

  constructor(private service: TransactionService, private database: PouchDBService) { }

  ngOnInit() {
    this.addTransactionForm = new FormGroup ({
      Description: new FormControl(),
      Amount: new FormControl(),
      categoryName: new FormControl(),
      time: new FormControl(Date())
  });
  }
  onSubmit({ value }: { value: Transaction }) {

    const transaction = <Transaction>value;
    console.log(transaction);
    this.service.newTransaction(transaction);
    this.database.put('transaction_' + Date().toString(), transaction);
  }
}
