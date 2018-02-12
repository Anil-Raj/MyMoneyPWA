import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

    categories: any[];
    transactions: Transaction[];
    groupByFilter = 'categoryId';
    constructor(private service: TransactionService) {
        this.service.awaitTransactions().subscribe(data => {
            if (data !== void 0) {
            this.transactions = data;
        }
    });
}

ngOnInit() {

}
getHeader(key, trs: Transaction[]) {
    if (this.groupByFilter === 'time') {
        return trs[0].time;
    }
    if (this.groupByFilter === 'categoryId') {
        console.log(key);
        return 'CategoryName';
    }
}

}
