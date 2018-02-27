import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {



  transaction: Transaction;
  selectedCategory: Category;
  isSelectCategoryVisible = false;
  constructor(private route: ActivatedRoute, private service: TransactionService) { }

  ngOnInit() {
      this.getTransaction();
  }

  getTransaction(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.service.getTransaction(id).subscribe(a => this.transaction = a );

  }
  update(category) {
    // this.transaction.categoryName = category;
    console.log(this.transaction.categoryName);

    this.service.updateTransaction(this.transaction);
  }
  selectCategory(event) {
    console.log(event);
    this.transaction.categoryName = event.name;
    this.transaction.categoryId = event.id;
    this.isSelectCategoryVisible = false;
  }
  selectCategoryWindow() {
    this.isSelectCategoryVisible = true;
  }

}
