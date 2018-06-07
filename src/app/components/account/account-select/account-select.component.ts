import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PouchDBService } from '../../../services/pouchdb.service';


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
    }

    ngOnInit() {

        this.database.get_acc().subscribe((acc) => {
            console.log(this.accounts);
            this.accounts = acc.rows.map(row => {
                console.log(row);
                this.database.get_tr_for_acc(row.doc).subscribe(trs => {
                    let sum = 0;
                    trs.docs.map(tr => {
                        sum += tr.amount;
                    });
                    console.log(sum);
                    row.doc.amount = sum / 100;
                });
                return row.doc;
            });
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
