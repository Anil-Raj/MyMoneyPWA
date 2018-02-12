import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

    transaction: any;
    constructor(private route: ActivatedRoute, private service: TransactionService) { }

    ngOnInit() {
        this.getTransaction();
    }

    getTransaction(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.service.getTransaction1(id).subscribe(data => this.transaction = data);
    }
    edit() {

    }


}
