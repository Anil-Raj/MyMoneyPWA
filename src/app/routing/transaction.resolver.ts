import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransactionService } from '../storage/transaction';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Transaction } from '../Models/Transaction';
import { SidebarService } from '../services/sidebar.service';

@Injectable()
export class TransactionsResolver implements Resolve<any> {

  constructor( private transactionService: TransactionService,
    private navService: SidebarService) { }

  resolve(): Observable<any> {
      let selectedAccount;
      let tran;
    this.navService.account.subscribe(ac => {

         this.transactionService.loadAll().then((transactions) =>{
             tran = transactions
             .map(row => Transaction.toForm(row))
            .filter(tr => tr.accountId == ac.id);
        });

    });
    return tran;
  }
}