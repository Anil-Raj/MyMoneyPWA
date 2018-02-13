import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Transaction } from '../../Models/Transaction';
import { Category } from '../../Models/Category';

@Injectable()
export class CategoryService {

    private categoryUrl = 'http://localhost:5000/api/category';


    private categoriesSubject = new BehaviorSubject(undefined);
    private fetching: boolean;

    constructor(private http: HttpClient) { }

    private getCategories() {
        return this.categoriesSubject.asObservable();
    }
    private getCategory(id) {
      const data = this.categoriesSubject.value;
      return data ? data.filter(c => c.id === id)[0] : '';
    }

    awaiCategories() {
        if (!this.categoriesSubject.value && !this.fetching) {
            this.refreshCategories();
        }
        return this.getCategories();
    }
    awaiCategory(id) {
      if (!this.categoriesSubject.value && !this.fetching) {
          this.refreshCategories();
      }
      return this.getCategory(id);
    }

    /* GET categories from server */
    refreshCategories() {
        this.fetching = true;
        return this.http.get<Transaction[]>(this.categoryUrl).subscribe(data => {
            this.fetching = false;
            this.categoriesSubject.next(data);
        }, err => {
            this.fetching = false;
            this.categoriesSubject.error(err);
        });
    }
    isDef(val) {
      return val !== void 0;
  }
}
