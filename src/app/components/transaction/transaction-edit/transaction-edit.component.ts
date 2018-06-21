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
import { Animations } from '../../../animations/animations';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.css'],
    animations: [Animations.slideUp],
})
export class TransactionEditComponent implements OnInit {

    selectedAccount: any;
    id;
    private transaction: any;
    editTransactionForm: FormGroup;
    kindEnum = KindEnum;
    constructor(private service: TransactionService,
        private database: PouchDBService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private navService: SidebarService) {
        this.navService.account.subscribe(ac => this.selectedAccount = ac);

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
        this.id = this.route.snapshot.paramMap.get('id');
        this.database.getDoc(this.id).subscribe((categories) => {
            this.transaction = categories.rows.map(row => {
                const tr = new Transaction();
                return tr.toForm(row.doc);
            });
            console.log(this.transaction);
            this.editTransactionForm.patchValue({
                note: this.transaction[0].note,
                amount: this.transaction[0].amount,
                category: this.transaction[0].category,
                time: this.transaction[0].time
            });

        });
    }
    onSubmit({ value }: { value: any }) {
        const transaction = new Transaction();
        const tran = value;
        console.log(value);
        tran.kind = value.category.Kind;
        console.log(KindEnum.EXPENSE, tran.kind);

        console.log(this.selectedAccount);
        tran.amount = tran.amount;
        // tran.accountId = this.selectedAccount._id;
        tran.categoryId = value.category._id;
        value.currency = 'USD';
        let tr: any;
        tr = transaction.fromForm(tran);
        // tr.accountId = this.selectedAccount._id;
        tr.id = this.transaction[0].id;
        console.log(tr);
        // transaction.accountId = this.selectedAccount._id;
        this.database.put(this.id, tr).then(() => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.location.back();
    }

}
