import { Component, OnInit } from '@angular/core';
import AccountStorage from '../../../storage/accounts'
import { CurrencyService } from '../../../services/currency.service';
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
        private currService: CurrencyService,
        private navService: SidebarService,
        private router: Router) { }

    ngOnInit() {
        this.navService.account.subscribe(ac=> this.selectedAccount = ac);

        AccountStorage.loadAll().then((accounts) => {
            console.log(accounts);
            this.accounts_data = accounts;
            accounts.map(a =>{
                let sum =0;
                a.currencies.map(currency => {
                
                    if(currency == 'USD') {
                        sum+=a.balance[currency];
                        console.log('us',sum);
                        
                        return;
                    }
                    console.log(currency, a.balance[currency]);
                    // console.log(this.currService.fetchExchangeRates('USD', Currency));
                    
                    this.currService.fetchExchangeRates('USD', currency).subscribe(rate=>{
                        console.log(rate);
                        sum+=a.balance[currency]*rate.value;
                                                
                    });
                });
                console.log(sum);
                
            });

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
