import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PouchDBService } from '../services/pouchdb.service';

export enum GroupBy {
    Category,
    Transaction
}


export enum ViewBy {
    Day,
    Week,
    Month,
    Year
}


@Injectable()
export class SidebarService {

    visible: boolean;
    groupBy = new BehaviorSubject<string>('categoryId');

    // viewBy = new BehaviorSubject<any>({ value: 0, range: 'week' });
    viewBy: any = { value: 0, range: 'week' };


    account = new BehaviorSubject<any>({});
    confirmGroupBy(groupBy: string) {
        this.groupBy.next(groupBy);
    }
    confirmViewBy(range: string) {
        // console.log(viewBy);
        console.log(range, { value: this.viewBy.getValue().value, range: range });

        this.viewBy.next({ value: this.viewBy.getValue().value, range: range });
    }
    // confirmViewByValue(value) {
    //     console.log(value);

    //     console.log({ value: value, range: this.viewBy.getValue().range });
    //     this.viewBy.next({ value: value, range: this.viewBy.getValue().range });
    // }
    confirmViewByValue(value) {

        this.viewBy.value = value;
    }


    confirmAccountValue(value) {
        console.log(value);

        console.log({ value: value, range: this.viewBy.range });
        this.account.next(value);
    }

    constructor(private database: PouchDBService) {
        this.visible = false;
    }

    hide() { this.visible = false; }

    show() { this.visible = true; }

    toggle() { this.visible = !this.visible; }

    doSomethingElseUseful() { }

    getGroupByOptions() {
        const gb = GroupBy;
        if (this.groupBy.getValue() === 'categoryId') {
            return gb.Transaction;
        } else {
            return gb.Category;
        }
    }
    // getViewByOptions() {
    //     const vb = ViewBy;
    //     if (this.viewBy.getValue().range === 'week') {
    //         return vb.Week;
    //     } else if (this.viewBy.getValue().range === 'month') {
    //         return vb.Month;
    //     } else {
    //         return vb.Year;
    //     }
    // }
    getViewByOptions() {
        const vb = ViewBy;
        // if (this.viewBy.getValue().range === 'week') {
        //     return vb.Week;
        // } else if (this.viewBy.getValue().range === 'month') {
        //     return vb.Month;
        // } else {
        //     return vb.Year;
        // }
        return this.viewBy.range === 'week' ? vb.Week : (this.viewBy.range === 'month' ? vb.Month : vb.Day);
    }

}
