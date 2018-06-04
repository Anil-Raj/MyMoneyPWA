import { Component, OnInit, trigger, style, transition, state, animate } from '@angular/core';
import { Transaction, KindEnum } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../category/category.service';
import { TransactionService } from '../services/transaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PouchDBService } from '../services/pouchdb.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SidebarService } from '../../../components/sidebar/sidebar.service';
import Currency from '../../../Models/Currency';

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
    private transaction: Transaction;
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
            const transaction = new Transaction();
            const tran = value;
            console.log(value);
            tran.kind = value.category.Kind;
            console.log(KindEnum.EXPENSE, tran.kind);

            console.log(this.selectedAccount);
            tran.amount = tran.amount;
            tran.accountId = this.selectedAccount._id;
            tran.categoryId = value.category._id;
            value.currency = 'USD';
            let tr: any;
            tr = transaction.fromForm(tran);
            tr.accountId = this.selectedAccount._id;
            if (value.category.Kind === KindEnum.TRANSFER) {
                tr.linkedAccountId = value.linkedAccound._id;
            }

            tr.kind = tran.category.Kind;
            tr.currency = 'USD';
            console.log(tr);
            // this.service.newTransaction(transaction);
            this.database.put('transaction_' + new Date().valueOf(), tr).then((a) => {
                console.log(a);
                this.router.navigate(['/transaction/']);
            });
        }
    }
    back() {
        this.location.back();
    }
}
