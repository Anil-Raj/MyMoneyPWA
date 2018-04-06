import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../components/sidebar/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PouchDBService } from '../../transaction/services/pouchdb.service';


@Component({
    selector: 'app-account-select',
    templateUrl: './account-select.component.html',
    styleUrls: ['./account-select.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate(500)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ],
})
export class AccountSelectComponent implements OnInit {
    accounts = [];
    isSelectAccount = false;
    selectedAccount: any;
    constructor(private navService: SidebarService, private database: PouchDBService) {
        this.database.getDoc('account').subscribe((transactions) => {
            this.accounts = transactions.rows.map(row => {
                return row.doc;
            });
            console.log(this.accounts);
            this.selectedAccount = this.accounts[0];
            console.log(this.selectedAccount);
        });


    }

    ngOnInit() {
        this.navService.account.subscribe(a => this.selectedAccount = a);
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
