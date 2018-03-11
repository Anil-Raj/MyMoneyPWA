import { Component, OnInit, NgZone, OnChanges } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { PouchDBService } from '../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../components/sidebar/sidebar.service';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnChanges {

    categories: any[];
    transactions: any[];
    groupByFilter = 'categoryId';
    today = new Date();
    public people: Transaction[];
    public form: any;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private zone: NgZone, private route: ActivatedRoute,
        private navService: SidebarService) {
        this.database.getDoc('transaction_').subscribe((transactions) => {
            this.transactions = transactions.rows.map(row => {
                return row.doc;
            });
            // console.log(this.transactions);

        });
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
    }

    ngOnInit() {
        this.groupByFilter = 'categoryId';
        console.log(this.groupByFilter);

    }
    ngOnChanges() {
    }
    getSum(items) {
        let sum = 0;
        items.map(item => {
            sum += parseInt(item.Amount, 10);
        });
        return sum;
    }
    income() {
        let sum = 0;
        this.transactions.map(a => {
            if (a.categoryName.Type === 'Income') {
                sum += parseInt(a.Amount, 10);
            }
        });
        return sum;
    }
    expense() {
        let sum = 0;
        this.transactions.map(a => {
            if (a.categoryName.Type === 'Expense') {
                sum += parseInt(a.Amount, 10);
            }
        });
        return sum;
    }
    netAmount() {
        return this.income() - this.expense();
    }
}
