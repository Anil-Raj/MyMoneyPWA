import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { trigger, style, state, transition, animate } from '@angular/animations';
import PouchDB from 'pouchdb';

import { SidebarService } from '../../../services/sidebar.service';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { Animations } from '../../../animations/animations';
import { TransactionService } from '../../../storage/transaction';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.css'],
    animations: [Animations.slideLeft],
})
export class TransactionEditComponent implements OnInit {
    private transaction: any;
    editTransactionForm: FormGroup;
    kindEnum = KindEnum;
    constructor(private transactionService: TransactionService,
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
        this. transactionService.load(id).then((transaction) => {
            Transaction.toForm(transaction);
            this.editTransactionForm.patchValue(transaction);
        });
    }
    onSubmit({ value }: { value: any }) {
        value = { ...this.transaction, ...value };
        let tr = Transaction.fromForm(value);
        this. transactionService.save(tr).then(() => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.location.back();
    }

}
