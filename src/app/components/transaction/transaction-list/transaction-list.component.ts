import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { PouchDBService } from '../../../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import * as moment from 'moment';
import {
    sync,
    load,
    loadRecent,
    loadFiltered,
    save,
    remove,
    removeByAccount,
    destroy
} from '../../../Models/storage/transaction';
import { Timerange } from './Timerange';


@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent  {

    timerange: any[] = [];
    selectedIndex = 1;
    transactionsFromAllAccount: any[];
    transactions: any[];
    groupByFilter = 'categoryId';
    viewByFilter;
    kindEnum = KindEnum;

    constructor(private service: TransactionService,
        private database: PouchDBService,
        private zone: NgZone, private route: ActivatedRoute,
        private navService: SidebarService) {

        this.database.get().subscribe((transactions) => {
            this.transactionsFromAllAccount = transactions.rows.map(row => {
                const transaction = new Transaction();
                return transaction.toForm(row.doc);
            });
            this.transactions = this.transactionsFromAllAccount;
            this.navService.account.subscribe(ac => {
                if (ac) {
                    this.transactions = this.transactionsFromAllAccount
                        .filter(tr => tr.accountId === ac._id);
                }
            });
        });
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
        this.navService.viewBy.subscribe(a => this.viewByFilter = a);
        this.updateTimerange();

    }
    updateTimerange() {
        this.navService.viewBy.subscribe(a => {
            const tr = new Timerange();
            console.log(tr.getTimeRanges(a, this.viewByFilter));

            this.timerange = tr.getTimeRanges(a, this.viewByFilter);
            console.log(this.timerange);

            this.selectedIndex = this.timerange.length - 2;
        });
    }

    sum(items) {
        let sum = 0;
        items.map(item => {
            sum += (parseInt(item.amount, 10) * (item.kind === KindEnum.INCOME ? 1 : -1));
        });
        return sum;
    }
    income(transactions) {
        let sum = 0;
        transactions
            .filter(tr => tr.category.Kind === KindEnum.INCOME)
            .map(a => {
                sum += parseInt(a.amount, 10);
            });
        return sum;
    }
    expense(transactions) {
        let sum = 0;
        transactions
            .filter(tr => tr.category.Kind === KindEnum.EXPENSE)
            .map(a => {
                sum += parseInt(a.amount, 10);
            });
        return sum;
    }
    netamount(transactions) {
        return this.income(transactions) + this.expense(transactions);
    }

    updateTr(val) {
        this.viewByFilter = {
            range: this.navService.viewBy.getValue().range,
            start: this.timerange[val.index].start
        };
        this.viewByFilter.isFuture = val.tab.textLabel === 'Future' ? true : false;
    }
}
