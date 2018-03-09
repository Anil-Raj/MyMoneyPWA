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
    transactions: Transaction[];
    groupByFilter = 'categoryName';
    today = new Date();
    public people: Transaction[];
    public form: any;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private zone: NgZone, private route: ActivatedRoute,
        private navService: SidebarService) {
        this.database.isTransactionsModified.subscribe(() => {
            this.database.getDoc('transaction_').subscribe((transactions) => {
                this.transactions = transactions.rows.map(row => {
                    return row.doc;
                });
                // console.log(this.transactions);

            });
        });
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);



    }

    ngOnInit() {
        // this.database.isTransactionsModified.then(() => {
        //     console.log('inside majsdhfjhdp');
        //     this.database.getDoc('transaction_').subscribe((categories) => {
        //         this.transactions = categories.rows.map(row => {
        //             console.log(row.doc);

        //             return row.doc;
        //         });
        //         console.log(this.transactions);

        //     });
        //     console.log('inside m');
        // });
        this.database.transactionsModified(true);

    }
    ngOnChanges() {

    }

    // getHeader(key, trs: any[]) {
    //     if (this.groupByFilter === 'time') {
    //         return trs[0].time;
    //     }
    //     if (this.groupByFilter === 'categoryName') {
    //         return trs[0].categoryName.Name;
    //     }
    // }
    getSum(items) {
        let sum = 0;
        items.map(item => {
            sum += parseInt(item.Amount, 10);
        });
        return sum;
    }

}
