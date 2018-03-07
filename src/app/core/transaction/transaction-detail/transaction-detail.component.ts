import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';
import { PouchDBService } from '../services/pouchdb.service';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

    transaction: any;
    constructor(private route: ActivatedRoute, private service: PouchDBService) { }

    ngOnInit() {
        this.getTransaction();
    }

    getTransaction(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.service.get(id).subscribe(a => {
          this.transaction = a;
        });
    }
    edit() {

    }


}
