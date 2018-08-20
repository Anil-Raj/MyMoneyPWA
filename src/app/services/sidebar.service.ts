import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AccountService } from '../storage/accounts';

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
    account = new BehaviorSubject<any>({
        Icon: "/assets/myicons/ml/icon_59.png",
        balance: { INR: 63400},
        currencies: ["INR"],
        name: "Wallet"
    });
    constructor(private accountService: AccountService) {
        this.visible = false;
        this.accountService.loadAll().then(ac => {
            this.account.next(ac[0]);
            console.log(this.account.getValue());
        });
    }
    confirmGroupBy(groupBy: string) {
        this.groupBy.next(groupBy);
    }
    confirmViewBy(range: string) {
        this.viewBy.next({ value: this.viewBy.getValue().value, range: range });
    }
    confirmViewByValue(value) {
        this.viewBy.next({ value: value, range: this.viewBy.getValue().range });
    }
    confirmAccountValue(value) {
        this.account.next(value);
    }
    hide() { this.visible = false; }
    show() { this.visible = true; }
    toggle() { this.visible = !this.visible; }
}
