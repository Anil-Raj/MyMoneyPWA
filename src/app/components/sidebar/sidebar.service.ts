import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

    viewBy = new BehaviorSubject<any>({ value: 0, range: 'week' });
    confirmGroupBy(groupBy: string) {
        this.groupBy.next(groupBy);
    }
    confirmViewBy(range: string) {
        // console.log(viewBy);

        this.viewBy.next({ value: this.viewBy.getValue().value, range: range });
    }
    confirmViewByValue(value) {
        console.log(value);

        console.log({ value: value, range: this.viewBy.getValue().range });
        this.viewBy.next({ value: value, range: this.viewBy.getValue().range });
    }

    constructor() { this.visible = false; }

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
    getViewByOptions() {
        const vb = ViewBy;
        if (this.viewBy.getValue().range === 'week') {
            return vb.Week;
        } else if (this.viewBy.getValue().range === 'month') {
            return vb.Month;
        } else {
            return vb.Year;
        }
    }

}
