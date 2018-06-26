import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { trigger, style, state, transition, animate } from '@angular/animations';
import PouchDB from 'pouchdb';

import { SidebarService } from '../../../services/sidebar.service';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';
import { KindEnum } from '../../../Models/Kind';
import TransactionStorage from '../../../storage/transaction';
import { Animations } from '../../../animations/animations';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.css'],
    animations: [Animations.slideUp],
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
            note: new FormControl(''),
            amount: new FormControl(''),
            category: new FormControl(''),
            time: new FormControl(new Date())
        });
        this.getTransaction();
    }

    getTransaction(): void {
        const id = this.route.snapshot.paramMap.get('id');
        TransactionStorage.load(id).then((transaction) => {
            console.log(transaction);
            this.transaction = Transaction.toForm(transaction);
            this.editTransactionForm.patchValue(this.transaction);
        });
    }
    onSubmit({ value }: { value: any }) {
        value = { ...this.transaction, ...value };
        let tr = Transaction.fromForm(value);
        TransactionStorage.save(tr).then(() => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.location.back();
    }

}
