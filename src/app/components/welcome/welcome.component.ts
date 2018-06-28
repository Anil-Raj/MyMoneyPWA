import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../storage/accounts';
import { FormGroup, FormControl } from '@angular/forms';
import { SidebarService } from '../../services/sidebar.service';
import { Account } from '../../Models/Account';
import { CategoryService } from '../../storage/category';
import { Transaction } from '../../Models/Transaction';
import { TransactionService } from '../../storage/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  step = 0;
  addAccountForm: any;
  constructor(private accountService: AccountService,
    private navbarService: SidebarService,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private router: Router) {
    this.accountService.loadAll().then(accounts => {
      console.log(accounts);
      if (accounts.length > 0) {
        this.router.navigate(['/transaction']);
      }
    });
  }
  // key: "AED", value: "AED", flag: "/assets/myicons/ml/ic_currency_aed.png", text: "AED, Emirati Dirham", exp: 2

  currency = {
    key: "USD",
    value: "USD",
    exp: 2,
    flag: "/assets/myicons/ml/ic_currency_usd.png",
    text: "US Dollar",
    symbol: "$"
  }
  phoneKeyboard = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, 'back_space']]
  ngOnInit() {
    this.addAccountForm = new FormGroup({
      name: new FormControl('Cash', ),
      currency: new FormControl('', ),
      balance: new FormControl('0'),
      icon: new FormControl('/assets/myicons/ml/icon_59.png')

    });

  }
  next(step) {
    this.step += 1;
  }
  key(value) {
    console.log(value);
    console.log(value != 'back_space');
    
    
    if (value != '.' && value != 'back_space') {      
      this.addAccountForm.value.balance = this.addAccountForm.value.balance * 10 + value;
    } else if(value == 'back_space'){
      this.addAccountForm.value.balance = (this.addAccountForm.value.balance / 10 )| 0;
    }


  }
  onSubmit({ valid, value }: { valid: boolean, value: any }) {
    if (valid) {
      let cur = value.currency.value;
      let balance = new Object;
      balance[cur] = value.balance;
      let data = {
        name: value.name,
        balance: balance,
        currencies: [cur],
        Icon: value.icon
      }
      let account = Account.fromForm(data);
      console.log(account);

      let otherCategory;
      if (value.balance != 0) {
        let categoryId = value.balance < 0 ? 'C0' : 'C1';
        this.categoryService.load(categoryId).then((category) => {
          console.log(category);
          let tran = {
            accountId: account.id,
            amount: value.balance,
            category: category,
            currency: value.currency.value,
            time: Date()
          }
          let tr = Transaction.fromForm(tran);
          this.transactionService.save(tr);
        });

      }
      console.log(account);
      this.accountService.save(account).then((a) => {
        this.navbarService.account.next(account);
        this.router.navigate(['/transaction/'])

      });
    }
  }

}
