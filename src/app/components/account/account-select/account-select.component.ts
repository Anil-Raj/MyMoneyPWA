import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Animations } from '../../../animations/animations';


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
    constructor(private navService: SidebarService, private database: PouchDBService) {
    }

    ngOnInit() {

        this.database.get_acc().subscribe((acc) => {
            console.log(this.accounts);
            this.accounts = acc;
            this.navService.account.subscribe(a => this.selectedAccount = a);
            this.navService.confirmAccountValue(this.accounts[0]);
        });
    }
    displaySelectAccount() {
        this.isSelectAccount = true;
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
