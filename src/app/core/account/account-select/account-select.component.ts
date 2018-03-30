import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../components/sidebar/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


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

    isSelectAccount = false;
    accounts: any = [{ id: 0, Name: 'Bank', Amount: 100 }, { id: 1, Name: 'Cash', Amount: 200 }];
    selectedAccount: any;
    constructor(private navService: SidebarService) { }

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
