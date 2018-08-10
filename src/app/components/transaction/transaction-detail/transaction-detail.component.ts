import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Transaction } from '../../../Models/Transaction';
import { KindEnum } from '../../../Models/Kind';
import { Animations } from '../../../animations/animations';
import { TransactionService } from '../../../storage/transaction';


@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.css'],
    animations: [Animations.slideUp],
})
export class TransactionDetailComponent implements OnInit {
    transaction: any;
    kindEnum = KindEnum;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private  transactionService: TransactionService
    ) { }
    ngOnInit() {
        this.getTransaction();
    }

    getTransaction(): void {
        const id = this.route.snapshot.paramMap.get('id');
         this.transactionService.load(id).then(tr => {
            this.transaction = Transaction.toForm(tr);
        });
    }
    edit() {
    }
    remove(tr) {
         this.transactionService.remove(tr._id).then((a) => {
            this.router.navigate(['/transaction/']);
        });
    }
    back() {
        this.router.navigate(['/transaction']);
    }
}
