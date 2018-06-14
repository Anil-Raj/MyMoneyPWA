import { Component, OnInit, NgZone, OnChanges, ViewEncapsulation } from '@angular/core';
import { KindEnum, Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { PouchDBService } from '../../../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { GroupByPipe } from '../../../pipes/group-by/group-by.pipe';
import { ViewByPipe } from '../../../pipes/view-by/view-by.pipe';
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


@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit, OnChanges {

    timerange: any[] = [

    ];
    selectedIndex = 1;
    categories: any[];
    transactionsFromAllAccount: any[];
    transactions: any[];
    groupByFilter = 'categoryId';
    today = new Date();
    public people: Transaction[];
    public form: any;
    viewByFilter;
    kindEnum = KindEnum;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private zone: NgZone, private route: ActivatedRoute,
        private navService: SidebarService) {


        // const a = this.database.loadRecent();
        // console.log(a);
        console.log('asdfaasldnfnlajkdnsfajkfsdf');
        // localStorage.setItem('userInfo',
        //     `{
        //     "accessToken":"GnaSUNZ_rg_gqAc3_bhUqPDWPNSNRWAt",
        //     "couchDB":{
        //         "username":"370ae3c8 - 1f13 - 425a - 83d8 - bf09b2d34603",
        //         "password":"948096ad - 632a - 42c2 - a49f - 96363529ec61",
        //         "transactions":"http://127.0.0.1:5984/transaction1234"
        //     }
        // }`);
        // sync(false);
        console.log('asdfasdf');

        // this.navService.account.subscribe(ac => {
        //     console.log(ac);
        //     this.database.get_tr_for_acc(ac).subscribe((transactions) => {
        //         // return transactions.docs;
        //         console.log(transactions);
        //         this.transactions = transactions.docs.map(transaction => {
        //             const tr = new Transaction();
        //             console.log(transaction);

        //             const tran = tr.toForm(transaction);
        //             console.log(tran);

        //             return transaction;
        //         });
        //         // console.log(this.transactions);


        //     });
        // });




        this.database.get().subscribe((transactions) => {
            this.transactionsFromAllAccount = transactions.rows.map(row => {
                const transaction = new Transaction();
                // console.log(row.doc);

                return transaction.toForm(row.doc);
            });
            // let accId;
            console.log(this.transactionsFromAllAccount);

            this.navService.account.subscribe(ac => {
                this.transactions = this.transactionsFromAllAccount
                    .filter(tr => tr.accountId === ac._id);
                // console.log(this.transactionsFromAllAccount);
                // console.log(this.transactions);
            });
            const gb = new GroupByPipe();
            const vb = new ViewByPipe();
            // this.transactions = vb.transform(this.transactions, this.viewByFilter);
            // console.log(this.transactions);
        });
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
        this.navService.viewBy.subscribe(a => this.viewByFilter = a);
        this.updateTimerange();

    }
    getAccountamount(account) {
        return 500;
    }
    updateTimerange() {
        this.navService.viewBy.subscribe(a => {
            this.timerange = [];
            const range: moment.unitOfTime.DurationConstructor = this.viewByFilter.range as moment.unitOfTime.DurationConstructor;
            console.log('adsfasd');
            const start = moment().startOf('day').add(-10, range);
            const end = moment().endOf('day');
            let day = start;

            while (day <= end) {
                if (range === 'month') {
                    if (day.isSame(moment(), 'month')) {
                        this.timerange.push(
                            {
                                Label: 'This Month',
                                start: day.format(),
                                range: 'month'
                            });

                    } else if (day.isSame(moment().add(-1, 'month'), 'month')) {
                        this.timerange.push(
                            {
                                Label: 'Last Month',
                                start: day.format(),
                                range: 'month'
                            });

                    } else {
                        this.timerange.push({
                            Label: day.format('MM/YYYY'),
                            start: day.format(),
                            range: 'month'

                        });
                    }
                } else if (range === 'week') {
                    if (day.isSame(moment(), 'week')) {
                        this.timerange.push(
                            {
                                Label: 'This Week',
                                start: day.format(),
                                range: 'week'
                            });

                    } else if (day.isSame(moment().add(-1, 'week'), 'week')) {
                        this.timerange.push(
                            {
                                Label: 'Last Week',
                                start: day.format(),
                                range: 'week'
                            });

                    } else {
                        this.timerange.push(
                            {
                                Label: day.format('DD/MM') + ' - ' + day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM'),
                                start: day.format(),
                                range: 'week'
                            });
                        // console.log(day.startOf('week').format('DD/MM/YYYY') + ' - ' +
                        // day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM/YYYY'));

                    }

                } else if (range === 'day') {
                    if (day.isSame(moment(), 'day')) {
                        this.timerange.push(
                            {
                                Label: 'Today',
                                start: day.format(),
                                range: 'day'
                            });

                    } else if (day.isSame(moment().add(-1, 'day'), 'day')) {
                        this.timerange.push(
                            {
                                Label: 'Yesterday',
                                start: day.format(),
                                range: 'day'
                            });

                    } else {
                        this.timerange.push({
                            Label: day.format('D MMM YYYY'),
                            start: day.format(),
                            range: 'day'
                        });
                    }
                }

                day = day.clone().add(1, range);
            }
            switch (range) {
                case 'day':     this.timerange.push({
                                    isFuture: true,
                                    Label: 'Future',
                                    start:  moment().endOf('day').clone().add(1, 's').format()   });
                                break;
                case 'month':   this.timerange.push({
                                    isFuture: true,
                                    Label: 'Future',
                                    start: moment().endOf('month').add(1, 's').format() });
                                break;
                case 'week':    this.timerange.push({
                                    isFuture: true,
                                    Label: 'Future',
                                    start: moment().endOf('week').add(1, 's').format() });
                                break;
            }

            console.log(this.timerange);
            this.selectedIndex = this.timerange.length - 2;

        });
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
            sum += (parseInt(item.amount, 10) * (item.kind === KindEnum.INCOME ? 1 : -1));
        });
        return sum;
    }
    income(transactions) {
        let sum = 0;
        transactions.map(a => {
            if (a.category.Kind === KindEnum.INCOME) {
                sum += parseInt(a.amount, 10);
            }
        });
        return sum;
    }
    expense(transactions) {
        let sum = 0;
        transactions.map(a => {
            if (a.category.Kind === KindEnum.EXPENSE) {
                sum += parseInt(a.amount, 10);
            }
        });
        return sum;
    }
    netamount(transactions) {
        // console.log(transactions);
        return this.income(transactions) + this.expense(transactions);
    }
    getLength(transactions: any[]) {
        console.log(this.transactions);
        return this.transactions.length > 0;
    }
    getTabLabel() {

    }
    updateTr(val) {
        console.log(val);
        console.log(this.timerange.length - 1 - this.selectedIndex);
        if (val.tab.textLabel === 'Future') {
            this.viewByFilter = {
                isFuture: true,
                range: this.navService.viewBy.getValue().range,
                start: this.timerange[val.index].start
            };
        } else {
            this.viewByFilter = {
                isFuture: false,
                range: this.navService.viewBy.getValue().range,
                start: this.timerange[val.index].start
            };
        }
        console.log(this.viewByFilter);

    }
}
