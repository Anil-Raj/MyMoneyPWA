import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Transaction } from '../Models/Transaction';
import { Category } from '../Models/Category';

@Injectable()
export class TransactionService {

    private transactionUrl = 'http://localhost:5000/api/tr';  // URL to web api
    private categoryUrl = 'http://localhost:5000/api/category';


    private transactionsSubject = new BehaviorSubject(undefined);
    private transactionSubject = new BehaviorSubject(undefined);
    private fetching: boolean;

    constructor(private http: HttpClient) {

    }

    // isDef(val) {
    //     return val !== void 0;
    // }
    // private getTransactions() {
    //     return this.transactionsSubject.asObservable();
    // }

    // awaitTransactions() {
    //     if (!this.transactionsSubject.value && !this.fetching) {
    //         this.refreshTransactions();
    //     }
    //     return this.getTransactions();
    // }

    /* GET transactions from server */
    //   refreshTransactions() {
    //       this.fetching = true;
    //       return this.http.get<Transaction[]>(this.transactionUrl).subscribe(data => {
    //           this.fetching = false;
    //           this.transactionsSubject.next(data);
    //       }, err => {
    //           this.fetching = false;
    //           this.transactionsSubject.error(err);
    //       });
    //   }

    //    getTransaction(id) {
    //      if(!this.transactionsSubject.value){
    //        console.log('ajds');
    //        return this.refreshTransaction(id);
    //      }
    //      console.log(this.transactionsSubject.value.filter(a => a.id === id)[0]);
    //     return this.transactionsSubject.value.filter(a => a.id === id)[0];
    //   }

    //   awaitTransaction(id): Observable<Transaction>  {
    //       if (!this.transactionSubject.value ) {
    //         // console.log('refresh');
    //         return this.refreshTransaction(id);
    //           // return this.refreshTransaction(id);
    //       }
    //       // return this.getTransaction(id);
    //   }

    //   /* GET transactions from server */
    //   refreshTransaction(id):  Observable<Transaction> {
    //     const url = `${this.transactionUrl}/${id}`;
    //         return this.http.get<Transaction>(url);
    //   }




    //     /** PUT: update the transaction on the server */
    // updateTransaction (transaction: Transaction) {
    //   const url = `${this.transactionUrl}/${transaction.id}`;
    //   this.http.put(url, transaction).subscribe(a=> {
    //     console.log(a);
    //     return 'adfasdf';

    //   });
    // }


    // getCategories(): Observable<Category[]> {
    //     return this.http.get<Category[]>(this.transactionUrl);
    // }
    // getCategoryById(id: number): Observable<Category> {
    //     const url = `${this.categoryUrl}/${id}`;
    //     return this.http.get<Category>(url);
    // }

    // getTransaction(id: number): Observable<Transaction> {
    //     // if("indexedDB" in window) {
    //     //     console.log("YES!!! I CAN DO IT!!! WOOT!!!");
    //     // } else {
    //     //     console.log("I has a sad.");
    //     // }
    //     const url = `${this.transactionUrl}/${id}`;
    //     return this.http.get<Transaction>(url);
    // }
    // getTransactions(): Observable<Transaction[]> {
    //     return this.http.get<Transaction[]>(this.transactionUrl);
    // }

    // updateTransaction (transaction: Transaction) {
    //   const url = `${this.transactionUrl}/${transaction.id}`;
    //   this.http.put(url, transaction).subscribe(a => {
    //     console.log(a);
    //   });
    // }

    // newTransaction (transaction: any) {
    //   const header = {'Content-Type': 'application/json'};
    //   this.http.post(this.transactionUrl, JSON.stringify(transaction), {headers: header}
    //   ).subscribe(a => {
    //     console.log(a);
    //   });
    // }


}
