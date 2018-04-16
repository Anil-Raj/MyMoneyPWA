import { Component, OnInit, trigger, style, transition, state, animate } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { PouchDBService } from '../services/pouchdb.service';
import { Location } from '@angular/common';
import { Transaction, KindEnum } from '../../../Models/Transaction';

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
        this.service.get().subscribe(a => {
            const tr = new Transaction();
            this.transaction = tr.toForm(a.rows[0].doc);
            console.log(this.transaction);
        });
    }
    edit() {
    }
    del(tr) {
        this.service.del(tr).then((a) => {
            console.log(a);
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.router.navigate(['/transaction']);
    }
}
