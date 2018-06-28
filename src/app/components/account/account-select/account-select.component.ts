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
    constructor(private navService: SidebarService, private router: Router,
        private accountService: AccountService) {
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
}
