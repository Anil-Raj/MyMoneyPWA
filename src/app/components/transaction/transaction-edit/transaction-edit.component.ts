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
            Note: new FormControl(''),
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
                Note: this.transaction[0].Note,
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


        // const transaction = value;
        // console.log(transaction);
        // transaction.amount = transaction.category.Type == 'Expense' && ? transaction.amount * -1 : transaction.amount;
        // transaction.accountId = this.selectedAccount._id;
        // this.service.newTransaction(transaction);
        this.database.put(this.id, tr).then(() => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.location.back();
    }

}
