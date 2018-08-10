import { Component, OnInit } from '@angular/core';
import  { AccountService } from '../../../storage/accounts'
import { SidebarService } from '../../../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {

    accounts_data;
    groupByFilter = 'Type';
    selectedAccount: any;
    constructor(
        private navService: SidebarService,
        private router: Router,
    private accountService:AccountService) { }

    ngOnInit() {
        this.navService.account.subscribe(ac=> this.selectedAccount = ac);

        this.accountService.loadAll().then((accounts) => {
            console.log(accounts);
            this.accounts_data = accounts;
        });
    }
    isSelectedAccount(ac){
        console.log(ac,this.selectedAccount);
        
        return ac.id == this.selectedAccount.id; 
    }
    select(ac){
        this.navService.confirmAccountValue(ac);
        this.router.navigate(['/transaction/']);
    }
    back(){
        // this.location.back();
        this.router.navigate(['/transaction/']);

    }
}
