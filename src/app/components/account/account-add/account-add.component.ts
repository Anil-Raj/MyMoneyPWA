import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Currency } from '../../../Models/Currency';
import { Location } from '@angular/common';
import AccountStorage from '../../../storage/accounts';
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
      icon: new FormControl()

    });
  }
  onSubmit({ valid, value }: { valid: boolean, value: any }) {
    if (valid) {
      let account = Account.fromForm(value);
      console.log(account);
      
      AccountStorage.save(account);
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
          this.transactionService.save(tr).then((a) => {
            console.log(a);
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
