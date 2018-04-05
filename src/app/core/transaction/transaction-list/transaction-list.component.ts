import { Component, OnInit, NgZone, OnChanges, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { PouchDBService } from '../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../../components/sidebar/sidebar.service';
import { GroupByPipe } from '../../../pipes/group-by.pipe';
import { ViewByPipe } from '../../../pipes/view-by.pipe';
import * as moment from 'moment';


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
        this.updateTimerange();

    }
    getAccountAmount(account) {
        return 500;
    }
    updateTimerange() {
        this.navService.viewBy.subscribe(a => {
            this.timerange = [];
            const range: moment.unitOfTime.DurationConstructor = this.viewByFilter.range as moment.unitOfTime.DurationConstructor;
            console.log('adsfasd');
            //     range = a.range;
            // } else {
            //     range = 'week';
            // }
            const start = moment().startOf('day').add(-5, 'month');
            const end = moment().endOf('day');

            // const this.timerange = [];
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
                        console.log(day.startOf('week').format('DD/MM/YYYY') + ' - ' +
                            day.startOf('week').clone().add(1, range).add(-1, 's').format('DD/MM/YYYY'));

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
            this.timerange.push({
                isFuture: true,
                Label: 'Future',
                start: moment().format()
            });
            // this.timerange.push(this.timerange);
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
