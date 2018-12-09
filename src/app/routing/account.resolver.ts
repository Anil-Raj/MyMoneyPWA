import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransactionService } from '../storage/transaction';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { SidebarService } from '../services/sidebar.service';

@Injectable()
export class AccountResolver implements Resolve<any> {

  constructor(private navService: SidebarService) { }

  resolve(): Observable<any> {
      let account;
    // this.navService.account.subscribe(ac =>account= ac);
    return account;
  }
}
