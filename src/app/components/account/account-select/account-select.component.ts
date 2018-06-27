import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Animations } from '../../../animations/animations';
import AccountStorage from '../../../storage/accounts'
import { Account } from '../../../Models/Account';
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
    constructor(private navService: SidebarService, private database: PouchDBService, private router: Router) {
    }

    ngOnInit() {
        AccountStorage.loadAll().then((acc) => {
            this.accounts = acc;
            this.selectedAccount = this.accounts.find(ac=>ac.id == this.selectedAccount.id)
            console.log(  this.selectedAccount.currencies[0]);
            console.log(this.selectedAccount.balance[this.selectedAccount.currencies[0]]);
            
        });
        this.navService.account.subscribe(ac=> this.selectedAccount = ac);
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
