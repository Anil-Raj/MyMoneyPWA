import { Component, OnInit, trigger, style, transition, state, animate } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { CategoryService } from '../../../services/category.service';
import { TransactionService } from '../../../services/transaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SidebarService } from '../../../services/sidebar.service';
import Currency from '../../../Models/Currency';
import { Account } from '../../../Models/Account';
import AccountStorage from '../../../storage/accounts'
import { Animations } from '../../../animations/animations';

@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrls: ['./transaction-add.component.css'],
    animations: [Animations.slideUp],
})
export class TransactionAddComponent implements OnInit {

    selectedAccount: any;
    private transaction;
    addTransactionForm: FormGroup;
    kindEnum = KindEnum;
    constructor(private router: Router,
        private location: Location,
        private navService: SidebarService,
        private transactionService: TransactionService
    ) {
        this.navService.account.subscribe(ac => {
            this.selectedAccount = ac;
            console.log(this.selectedAccount);
        });
    }

    ngOnInit() {
        this.addTransactionForm = new FormGroup({
            note: new FormControl(),
            amount: new FormControl('0', Validators.required),
            category: new FormControl('', Validators.required),
            time: new FormControl(Date(), Validators.required)
        });
    }
    onSubmit({ valid, value }: { valid: any, value: any }) {
        if (valid) {
            value.currency = 'USD';
            value.accountId = this.selectedAccount.id;
            let tr = Transaction.fromForm(value);
            const mutation = {
                accountId: this.selectedAccount.id,
                amount: tr.amount,
                currency: 'USD'
            }
            AccountStorage.mutateBalance(mutation);
            this.transactionService.save(tr).then((a) => {
                this.router.navigate(['/transaction/']);

            });
        }
    }
    back() {
        this.location.back();
    }
}
