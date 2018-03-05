import { Component, OnInit, NgZone } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { PouchDBService } from '../services/pouchdb.service';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

    categories: any[];
    transactions: Transaction[];
    groupByFilter = 'categoryName';
    today = new Date();
    public people: Transaction[];
    public form: any;
    constructor(private service: TransactionService, private database: PouchDBService,  private zone: NgZone) {

        this.database.fetch().then(result => {
            console.log(result);

            this.people = [];
            for(let i = 0; i < result.rows.length; i++) {
                this.people.push(result.rows[i].doc);
            }
            console.log(this.people);
        }, error => {
            console.error(error);
        });

        this.service.getTransactions().subscribe(data => {
            if (data !== void 0) {
              this.transactions = data;
              console.log(data);


            }
        });
}

ngOnInit() {
    // this.database.getChangeListener().subscribe(data => {
    //     for(let i = 0; i < data.change.docs.length; i++) {
    //         this.zone.run(() => {
    //             this.people.push(data.change.docs[i]);
    //         });
    //     }
    // });
    // this.database.fetch().then(result => {
    //     this.people = [];
    //     for(let i = 0; i < result.rows.length; i++) {
    //         this.people.push(result.rows[i].doc);
    //     }
    // }, error => {
    //     console.error(error);
    // });
}

getHeader(key, trs: Transaction[]) {
    if (this.groupByFilter === 'time') {
        return trs[0].time;
    }
    if (this.groupByFilter === 'categoryName') {
        // console.log(key);
        return trs[0].categoryName;
    }
}

}
