import { Component, OnInit, trigger, style, transition, state, animate } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../category/category.service';
import { TransactionService } from '../services/transaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PouchDBService } from '../services/pouchdb.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

    private transaction: Transaction;
    addTransactionForm: FormGroup;

    constructor(private service: TransactionService,
        private database: PouchDBService,
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        this.addTransactionForm = new FormGroup({
            Description: new FormControl(),
            Amount: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            time: new FormControl(Date(), Validators.required)
        });
    }
    onSubmit({ valid, value }: { valid: any, value: any }) {
        if (valid) {
            const transaction = value;
            console.log(transaction);
            transaction.categoryId = transaction.category._id;
            this.service.newTransaction(transaction);
            this.database.put('transaction_' + new Date().valueOf(), transaction).then((a) => {
                console.log(a);
                this.router.navigate(['/transaction/']);
            });
        }
    }
    back() {
        this.location.back();
    }
}
