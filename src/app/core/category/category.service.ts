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
    awaiCategories() {
        if (!this.categoriesSubject.value && !this.fetching) {
            this.refreshCategories();
        }
        return this.getCategories();
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
    getCategory(id) {
      if (!this.categoriesSubject.value) {
        return this.refreshCategory(id);
      }
     return this.categoriesSubject.value.filter(a => a.id === id)[0];
   }

   awaitCategory(id): Observable<Category>  {
       if (!this.categoriesSubject.value ) {
         // console.log('refresh');
         return this.refreshCategory(id);
           // return this.refreshCategory(id);
       }
       return this.getCategory(id);
   }

   /* GET transactions from server */
   refreshCategory(id):  Observable<Category> {
     const url = `${this.categoryUrl}/${id}`;
         return this.http.get<Category>(url);
   }




    isDef(val) {
      return val !== void 0;
  }
}
