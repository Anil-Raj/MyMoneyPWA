import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../../../storage/accounts';
import { TransactionService } from '../../../storage/transaction';
import { Account } from '../../../Models/Account';
import { Transaction } from '../../../Models/Transaction';
import { SidebarService } from '../../../services/sidebar.service';
import { CategoryService } from '../../../storage/category';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  addAccountForm: FormGroup;
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private router: Router,
    private location: Location,
    private navbarService: SidebarService
  ) {

  }

  ngOnInit() {
    this.addAccountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      balance: new FormControl('0'),
      icon: new FormControl('/assets/myicons/ml/icon_59.png')

    });
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

      this.accountService.save(account);
      let otherCategory;
      if (value.balance != 0) {
        let categoryId = value.balance < 0 ? 'C0' : 'C1';
        this.categoryService.load(categoryId).then((category) => {
          let tran = {
            accountId: account.id,
            amount: value.balance,
            category: category,
            currency: value.currency.value,
            time: Date()
          }
          let tr = Transaction.fromForm(tran);
          this.transactionService.save(tr).then((a) => {
            this.navbarService.account.next(account);
            this.router.navigate(['/account/']);
          });
        });

      }



    }
  }
  back() {
    this.location.back();
  }
}
