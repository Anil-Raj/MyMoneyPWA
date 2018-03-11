import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PouchDBService {

    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    public constructor() {
        if (!this.isInstantiated) {
            this.database = new PouchDB('dman');
            this.isInstantiated = true;
            this.database.bulkDocs([
                { Name: 'Cloth', Type: 'Expense', _id: 'category_expense_1', Icon: '/assets/myicons/ml/icon_17.png' },
                { Name: 'Electronic Gadgets', Type: 'Expense', _id: 'category_expense_2', Icon: '/assets/myicons/ml/icon_9.png' },
                { Name: 'Travel', Type: 'Expense', _id: 'category_expense_3', Icon: '/assets/myicons/ml/ic_category_travel.png' },
                { Name: 'Salary', Type: 'Income', _id: 'category_income_1', Icon: '/assets/myicons/ml/ic_category_salary.png' },
                {
                    Name: 'Interest Money', Type: 'Income', _id: 'category_income_2',
                    Icon: '/assets/myicons/ml/ic_category_interestmoney.png'
                },
                { Name: 'Debt Collection', Type: 'Income', _id: 'category_income_3', Icon: '/assets/myicons/ml/icon_140.png' },
            ]).then(function (result) {
                // handle result
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

    public fetch() {
        return this.database.allDocs({ include_docs: true });
    }

    public get(id: string) {
        return Observable.from(this.database.get(id));
    }

    public put(id: string, document: any) {
        document._id = id;
        console.log(document);
        return this.database.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if (error.status == '404') {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }


    public getDoc(id: string): any {
        return Observable.from(this.database.allDocs({ startkey: id, endkey: id + '\uffff', include_docs: true }));

    }
    public sync(remote: string) {
        const remoteDatabase = new PouchDB(remote);
        this.database.sync(remoteDatabase, {
            live: true
        }).on('change', change => {
            this.listener.emit(change);
        }).on('error', error => {
            console.error(JSON.stringify(error));
        });
    }
    public del(id: string) {
        console.log(document);
        return this.database.get(id).then(result => {
            result._deleted = true;
            return this.database.put(result);
        }, error => {
            if (error.status == '404') {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });

    }

    public getChangeListener() {
        return this.listener;
    }

}
