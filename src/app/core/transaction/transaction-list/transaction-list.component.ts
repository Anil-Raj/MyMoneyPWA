import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

    categories: any[];
    transactions: Transaction[];
    groupByFilter = 'categoryName';
    constructor(private service: TransactionService, private catService: CategoryService) {
        this.service.getTransactions().subscribe(data => {
            if (data !== void 0) {
              this.transactions = data;
              console.log(data);

            }
        });
}

ngOnInit() {

}
getHeader(key, trs: Transaction[]) {
    if (this.groupByFilter === 'time') {
        return trs[0].time;
    }
    if (this.groupByFilter === 'categoryName') {
        console.log(key);
        return trs[0].categoryName;
    }
}

}
