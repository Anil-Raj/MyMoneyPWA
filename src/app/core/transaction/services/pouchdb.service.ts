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
    isTransactionsModified = new BehaviorSubject<boolean>(false);
    public constructor() {
        if (!this.isInstantiated) {
            this.database = new PouchDB('dman');
            this.isInstantiated = true;
            this.database.bulkDocs([
                { Name: 'Salary', Type: 'Income', _id: 'category_income_1', Icon: '' },
                { Name: 'Internet Bill', Type: 'Expense', _id: 'category_expense_2', Icon: '' },
                { Name: 'TV Bill', Type: 'Expense', _id: 'category_expense_3', Icon: '' }
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

    public getChangeListener() {
        return this.listener;
    }
    transactionsModified(value) {
        this.isTransactionsModified.next(value);
    }

}
