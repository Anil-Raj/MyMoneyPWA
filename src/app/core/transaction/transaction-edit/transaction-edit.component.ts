import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { PouchDBService } from '../services/pouchdb.service';
import { FormGroup, FormControl } from '@angular/forms';
import PouchDB from 'pouchdb';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.css'],
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
export class TransactionEditComponent implements OnInit {

    id;
    private transaction: any;
    editTransactionForm: FormGroup;

    constructor(private service: TransactionService,
        private database: PouchDBService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.editTransactionForm = new FormGroup({
            Description: new FormControl(''),
            Amount: new FormControl(''),
            category: new FormControl(''),
            time: new FormControl(new Date())
        });
        this.getTransaction();
    }

    getTransaction(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.database.getDoc(this.id).subscribe((categories) => {
            this.transaction = categories.rows.map(row => {
                return row.doc;
            });
            this.editTransactionForm.patchValue({
                Description: this.transaction[0].Description,
                Amount: this.transaction[0].Amount,
                category: this.transaction[0].category,
                time: this.transaction[0].time
            });

        });
    }
    onSubmit({ value }: { value: any }) {
        const transaction = value;
        console.log(transaction);
        this.service.newTransaction(transaction);
        this.database.put(this.id, transaction).then(() => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.location.back();
    }

}
