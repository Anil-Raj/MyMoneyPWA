
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Transaction } from './Models/Transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  categories: any[];
  transactions: Transaction[];
  groupByFilter = 'categoryId';
  constructor(private service: ServiceService) {
    this.service.getTransactions().subscribe(tr => this.transactions = tr);
    this.service.getCategories().subscribe(c => this.categories = c);
  }

  ngOnInit() {

  }
  getHeader(key, trs: Transaction[]) {
    if (this.groupByFilter === 'time') {
      return trs[0].time;
    }
    if (this.groupByFilter === 'categoryId') {
      console.log(key);

      // return this.service.getCategoryById(key).subscribe(c => c.name);
      return 'CategoryName';
    }
  }
}
