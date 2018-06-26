import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { PouchDBService } from '../../../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import * as moment from 'moment';
import 'hammerjs';

import TransactionStorage from '../../../storage/transaction';
import { Timerange } from './Timerange';


@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent {
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
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
                return Transaction.toForm(row.doc);
            });
            this.transactions = this.transactionsFromAllAccount;
            console.log(this.transactions);

            this.navService.account.subscribe(ac => {
                if (ac) {
                    this.transactions = TransactionStorage.filterByAccount(this.transactionsFromAllAccount, [ac]);
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
            this.timerange = tr.getTimeRanges(this.viewByFilter);
            this.selectedIndex = this.timerange.length - 2;
        });
    }
    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {

        if (currentIndex > this.timerange.length - 1 || currentIndex < 0) return;
        if (action === this.SWIPE_ACTION.LEFT) {
            this.selectedIndex += currentIndex < this.timerange.length - 1 ? 1 : 0;
        }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.selectedIndex -= currentIndex > 0 ? 1 : 0;
        }
    }

    sum(items) {
        let sum = 0;
        items.map(item => {
            sum += (parseInt(item.amount, 10) * (item.category.Kind === KindEnum.INCOME ? 1 : -1));
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
        return this.income(transactions) - this.expense(transactions);
    }

}
