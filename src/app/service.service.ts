import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './Models/Transaction';
import { Category } from './Models/Category';

@Injectable()
export class ServiceService {

  private transactionUrl = 'http://localhost:5000/api/tr';  // URL to web api
  private categoryUrl = 'http://localhost:5000/api/category';

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getTransactions (): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl);
  }
  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionUrl}/${id}`;
    return this.http.get<Transaction>(url);
  }
  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(this.transactionUrl);
  }
  getCategoryById(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url);
  }
}
