import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { Animations } from '../../../animations/animations';
import { AccountService } from '../../../storage/accounts'
import { Router } from '@angular/router';


@Component({
    selector: 'app-account-select',
    templateUrl: './account-select.component.html',
    styleUrls: ['./account-select.component.css'],
    animations: [Animations.flyInOut],
})
export class AccountSelectComponent implements OnInit {
    accounts = [];
    isSelectAccount = false;
    selectedAccount: any;
    viewByFilter;
    groupByFilter;

    constructor(public navService: SidebarService,
        private router: Router,
        private accountService: AccountService) {
        this.navService.viewBy.subscribe(a => this.viewByFilter = a.range);
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
    }


    ngOnInit() {
        this.accountService.loadAll().then((acc) => {
            this.accounts = acc;
            this.selectedAccount = this.accounts.find(ac => ac.id == this.selectedAccount.id)
        });
        this.navService.account.subscribe(ac => this.selectedAccount = ac);
    }
    displaySelectAccount() {
        this.router.navigate(['/account/']);
    }
    select(account) {
        this.navService.confirmAccountValue(account);
        this.selectedAccount = account;
        this.isSelectAccount = false;
    }
    back() {
        this.isSelectAccount = false;
    }
    groupByTransaction() {
        this.navService.confirmGroupBy('time');
    }
    groupByCategory() {
        this.navService.confirmGroupBy('categoryId');
    }
    groupByMonth() {
        this.navService.confirmViewBy('month');
    }
    groupByDay() {
        this.navService.confirmViewBy('day');
    }
    groupByWeek() {
        this.navService.confirmViewBy('week');
    }
}
