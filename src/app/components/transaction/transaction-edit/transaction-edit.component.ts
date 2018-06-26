import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import PouchDB from 'pouchdb';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { SidebarService } from '../../../services/sidebar.service';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { KindEnum } from '../../../Models/Kind';
import TransactionStorage from '../../../storage/transaction';

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

    private transaction: any;
    editTransactionForm: FormGroup;
    kindEnum = KindEnum;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private navService: SidebarService) {
    }

    ngOnInit() {
        this.editTransactionForm = new FormGroup({
            Note: new FormControl(''),
            amount: new FormControl(''),
            category: new FormControl(''),
            time: new FormControl(new Date())
        });
        this.getTransaction();
    }

    getTransaction(): void {
        const id = this.route.snapshot.paramMap.get('id');
        TransactionStorage.load(id).subscribe((transaction) => {
            this.transaction = transaction.rows.map(row => {
                return Transaction.toForm(row.doc);
            });
            this.editTransactionForm.patchValue(this.transaction[0]);
        });
    }
    onSubmit({ value }: { value: any }) {
        value = { ...this.transaction[0], ...value };
        let tr = Transaction.fromForm(value);
        TransactionStorage.save(tr).then(() => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.location.back();
    }

}
