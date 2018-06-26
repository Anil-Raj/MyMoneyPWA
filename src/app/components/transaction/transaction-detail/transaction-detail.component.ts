import { Component, OnInit, trigger, style, transition, state, animate } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Location } from '@angular/common';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import TransactionStorage from '../../../storage/transaction';


@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.css'],
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
export class TransactionDetailComponent implements OnInit {

    transaction: any;
    kindEnum = KindEnum;
    constructor(private route: ActivatedRoute,
        private service: PouchDBService,
        private router: Router,
        private location: Location,
    ) { }
    ngOnInit() {
        this.getTransaction();
    }

    getTransaction(): void {
        const id = this.route.snapshot.paramMap.get('id');
        TransactionStorage.load(id).then(tr => {
            this.transaction = Transaction.toForm(tr);
        });
    }
    edit() {
    }
    remove(tr) {
        TransactionStorage.remove(tr._id).then((a) => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.router.navigate(['/transaction']);
    }
}
