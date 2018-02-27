import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../category/category.service';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  category: any;
    transaction: any;
    constructor(private route: ActivatedRoute, private service: TransactionService, private categoryServie: CategoryService) { }

    ngOnInit() {
        this.getTransaction();
    }

    getTransaction(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.service.getTransaction(id).subscribe(a => {
          this.transaction = a;
          console.log(a);
        });
    }
    edit() {

    }


}
