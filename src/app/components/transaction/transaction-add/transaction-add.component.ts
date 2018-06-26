import { Component, OnInit, trigger, style, transition, state, animate } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../../services/category.service';
import { TransactionService } from '../../../services/transaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SidebarService } from '../../../services/sidebar.service';
import Currency from '../../../Models/Currency';
import { Account } from '../../../Models/Account';

@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrls: ['./transaction-add.component.css'],
    animations: [
        trigger('slideUp', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate('.3s ease-out')
            ]),
            transition('* => void', [
                animate(500, style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ],
})
export class TransactionAddComponent implements OnInit {

    selectedAccount: any;
    private transaction;
    addTransactionForm: FormGroup;
    kindEnum = KindEnum;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private router: Router,
        private location: Location,
        private navService: SidebarService) {
        this.navService.account.subscribe(ac => {
            this.selectedAccount = ac;
            console.log(this.selectedAccount);

        });

    }

    ngOnInit() {
        this.addTransactionForm = new FormGroup({
            Note: new FormControl(),
            amount: new FormControl('0', Validators.required),
            category: new FormControl('', Validators.required),
            time: new FormControl(Date(), Validators.required)
        });
    }
    onSubmit({ valid, value }: { valid: any, value: any }) {
        if (valid) {
            console.log(this.selectedAccount);
            value.currency = 'USD';
            value.accountId = this.selectedAccount.id;
            let tr = Transaction.fromForm(value);
            console.log(tr);
            this.database.put('transaction_' + new Date().valueOf(), tr).then((a) => {
                console.log(a);
                this.router.navigate(['/transaction/']);

            });
            const data = {
                id: 'A12345',
                name: 'Test',
                group: 'cash',
                balance: {
                    USD: 10095,
                    JPY: 2200
                },
                currencies: ["USD", "EUR", "JPY"]
            }
            // const acc1 = Account.toStorage(data);
            // console.log(this.database.put_acc(acc1));
            const mutation = {
                accountId: 'A12345',
                amount: tr.amount,
                currency: 'USD'
            }

            const acc = this.database.mutateBalance(mutation);
            console.log('mutated acc', acc);

            // this.database.put_acc(acc);
        }
    }
    back() {
        this.location.back();
    }

}
