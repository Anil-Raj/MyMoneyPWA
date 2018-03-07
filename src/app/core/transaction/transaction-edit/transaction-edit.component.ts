import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { PouchDBService } from '../services/pouchdb.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {



  transaction: any;
  selectedCategory: Category;
  isSelectCategoryVisible = false;
  constructor(private route: ActivatedRoute, private service: PouchDBService) { }

  ngOnInit() {
      this.getTransaction();
  }

  getTransaction(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.get(id).subscribe(a => {
      this.transaction = a;
    });
  }
  update(category) {
    // this.transaction.categoryName = category;
    console.log(this.transaction.categoryName);

    this.service.put(this.transaction._id, this.transaction);
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
