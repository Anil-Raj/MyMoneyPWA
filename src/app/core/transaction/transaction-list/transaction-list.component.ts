import { Component, OnInit, NgZone, OnChanges } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { PouchDBService } from '../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../components/sidebar/sidebar.service';
import { GroupByPipe } from '../../../pipes/group-by.pipe';
import { ViewByPipe } from '../../../pipes/view-by.pipe';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnChanges {

    timerange: string[] = [
        'Last',
        'This',
        'Future'

    ];
    categories: any[];
    transactions: any[];
    groupByFilter = 'categoryId';
    today = new Date();
    public people: Transaction[];
    public form: any;
    viewByFilter;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private zone: NgZone, private route: ActivatedRoute,
        private navService: SidebarService) {
        this.database.getDoc('transaction_').subscribe((transactions) => {
            this.transactions = transactions.rows.map(row => {
                return row.doc;
            });
            const gb = new GroupByPipe();
            const vb = new ViewByPipe();
            // this.transactions = vb.transform(this.transactions, this.viewByFilter);
            // console.log(this.transactions);
        });
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
        this.navService.viewBy.subscribe(a => this.viewByFilter = a);
    }

    ngOnInit() {
        this.groupByFilter = 'categoryId';
        console.log(this.groupByFilter);

    }
    ngOnChanges() {
    }
    getSum(items) {
        // console.log(items);

        let sum = 0;
        items.map(item => {
            sum += parseInt(item.Amount, 10);
        });
        return items[0].category.Type === 'Income' ? sum : sum * -1;
        // return sum;
    }
    income(transactions) {
        // console.log(transactions);

        let sum = 0;
        transactions.map(a => {
            if (a.category.Type === 'Income') {
                sum += parseInt(a.Amount, 10);
            }
        });
        return sum;
    }
    expense(transactions) {
        let sum = 0;
        // console.log(transactions);
        transactions.map(a => {
            if (a.category.Type === 'Expense') {
                sum += parseInt(a.Amount, 10);
            }
        });
        return sum;
    }
    netAmount(transactions) {
        return this.income(transactions) - this.expense(transactions);
    }
    getLength(transactions: any[]) {
        console.log(this.transactions);
        return this.transactions.length > 0;
    }
    getTabLabel() {

    }
    updateTr(val) {
        console.log(val.tab.textLabel);

        if (val.tab.textLabel === 'This ' + this.viewByFilter.range) {
            console.log('Today');

            // this.viewByFilter = { value: 0, range: 'date' };
            this.navService.confirmViewByValue(0);
        } else if (val.tab.textLabel === 'Last ' + this.viewByFilter.range) {
            console.log('Last');

            this.navService.confirmViewByValue(-1);
            // this.viewByFilter = { value: -1, range: 'date' };
        } else {
            this.navService.confirmViewByValue(1);
        }
        // this.viewByFilter = { value: 0, range: 'date' };
        // this.navService.confirmViewBy({ value: 0, range: 'date' });

    }
}
