import { Component, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import * as moment from 'moment';

import 'hammerjs';

import { Timerange } from './Timerange';
import { TransactionService } from '../../../storage/transaction';


@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent {
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    timerangeList: any[] = [];
    selectedIndex;
    transactions: any[];
    groupByFilter = 'categoryId';
    viewByFilter;
    kindEnum = KindEnum;
    selectedAccount: any;

    constructor(private route: ActivatedRoute,
        private navService: SidebarService,
        private transactionService: TransactionService) {
            this.selectedAccount = this.route.snapshot.data['account'];
            this.transactions = this.route.snapshot.data['transactions'];
        // this.transactionService.loadAll().then((transactions) => {
        //     this.navService.account.subscribe(ac => {
        //         this.selectedAccount = ac;
        //         console.log(ac);

        //         this.transactions = transactions
        //             .map(row => Transaction.toForm(row))
        //             .filter(tr => tr.accountId == ac.id)
        //     });
        // });
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
        this.navService.viewBy.subscribe(a => this.viewByFilter = a);
        this.updateTimerange();
    }
    updateTimerange() {
        this.navService.viewBy.subscribe(range => {
            const tr = new Timerange();
            this.timerangeList = tr.getTimeRangeList(this.viewByFilter);
            this.selectedIndex = this.timerangeList.length - 2;
        });
    }
    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        if (currentIndex > this.timerangeList.length - 1 || currentIndex < 0) return;
        if (action === this.SWIPE_ACTION.LEFT) {
            this.selectedIndex += currentIndex < this.timerangeList.length - 1 ? 1 : 0;
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
