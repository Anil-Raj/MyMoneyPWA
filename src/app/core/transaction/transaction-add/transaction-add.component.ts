import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../category/category.service';
import { TransactionService } from '../services/transaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {


  private transaction: Transaction = null;
  selectedCategory: Category;
  categoryList: any;

  // description: string;
  amount: number;
  addTransactionForm: FormGroup;



  // description = new FormControl('Description of TRansaction', Validators.required);




  constructor(private service: TransactionService, private categoryServie: CategoryService) { }

  ngOnInit() {
    this.categoryServie.awaiCategories().subscribe(a => {this.categoryList  = a; console.log(a);
    });
    this.addTransactionForm = new FormGroup ({
      Description: new FormControl('Description of TRansaction', Validators.required),
      Amount: new FormControl('0', Validators.required),
      // CategoryId: new FormControl(),
      CategoryName: new FormControl(),
      Date: new FormControl()
  });
  }


  onSubmit({ value }: { value: Transaction }) {
    // const date: Date = new Date();
    // const transaction: TransactionModel = {
    //   Id: 0,
    //   Description: '',
    //     Amount: 0,
    //     CategoryId: 0,
    //     CategoryName: '',
    //     Time: date

    // };
    // transaction.Description = this.description;
    // transaction.Amount = this.amount;
    const transaction = <Transaction>value;
    console.log(transaction);


    this.service.newTransaction(transaction);
  }


}
class TransactionModel {
  Id: number;
  Amount: number;
  Description: string;
  Time: Date;
  CategoryId: number;
  CategoryName: string;
}


