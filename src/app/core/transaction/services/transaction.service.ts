import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Transaction } from '../../../Models/Transaction';
import { Category } from '../../../Models/Category';

@Injectable()
export class TransactionService {

    private transactionUrl = 'http://localhost:5000/api/tr';  // URL to web api
    private categoryUrl = 'http://localhost:5000/api/category';


    private transactionsSubject = new BehaviorSubject(undefined);
    private fetching: boolean;

    constructor(private http: HttpClient) { }

    private getTransactions() {
        return this.transactionsSubject.asObservable();
    }
    isDef(val) {
        return val !== void 0;
    }
    awaitTransactions() {
        if (!this.transactionsSubject.value && !this.fetching) {
            this.refreshTransactions();
        }
        return this.getTransactions();
    }

    /* GET transactions from server */
    refreshTransactions() {
        this.fetching = true;
        return this.http.get<Transaction[]>(this.transactionUrl).subscribe(data => {
            this.fetching = false;
            this.transactionsSubject.next(data);
        }, err => {
            this.fetching = false;
            this.transactionsSubject.error(err);
        });
    }



    getTransaction1(id: number): Observable<Transaction> {
        const url = `${this.transactionUrl}/${id}`;
        return this.http.get<Transaction>(url);
    }
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.transactionUrl);
    }
    getCategoryById(id: number): Observable<Category> {
        const url = `${this.categoryUrl}/${id}`;
        return this.http.get<Category>(url);
    }
}
