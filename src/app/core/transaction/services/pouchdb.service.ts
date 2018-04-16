import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PouchDBService {

    private isInstantiated: boolean;
    private cat_database: any;
    private acc_database: any;
    private database: any;

    private listener: EventEmitter<any> = new EventEmitter();
    public constructor() {
        if (!this.isInstantiated) {
            this.cat_database = new PouchDB('category');
            this.acc_database = new PouchDB('account');
            this.database = new PouchDB('transaction');
            this.isInstantiated = true;
            this.cat_database.bulkDocs([
                {
                    Name: 'Cloth', Kind: 0, _id: 'expense_1',
                    Icon: '/assets/myicons/ml/icon_17.png'
                },
                {
                    Name: 'Electronic Gadgets', Kind: 0, _id: 'expense_2',
                    Icon: '/assets/myicons/ml/icon_9.png'
                },
                {
                    Name: 'Travel', Kind: 0, _id: 'expense_3',
                    Icon: '/assets/myicons/ml/ic_category_travel.png'
                },
                {
                    Name: 'Salary', Kind: 1, _id: 'income_1',
                    Icon: '/assets/myicons/ml/ic_category_salary.png'
                },
                {
                    Name: 'Interest Money', Kind: 1, _id: 'income_2',
                    Icon: '/assets/myicons/ml/ic_category_interestmoney.png',
                },
                {
                    Name: 'Debt Collection', Kind: 1, _id: 'income_3',
                    Icon: '/assets/myicons/ml/icon_140.png',
                }
            ]).then(function (result) {
                // handle result
            }).catch(function (err) {
                console.log(err);
            });

            this.acc_database.bulkDocs([
                { _id: 'account_1', Name: 'Bank1234', amount: 0 },
                { _id: 'account_2', Name: 'Cash', amount: 0 }
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
    public get_tr_for_acc(ac):any {
        return Observable.from(this.database.find({ selector: { accountId: ac._id } }));
    }
    public get(): any {
        return Observable.from(this.database.allDocs({ include_docs: true }));
    }
    public get_cat(): any {
        return Observable.from(this.cat_database.allDocs({ include_docs: true }));
    }
    public get_acc(): any {
        return Observable.from(this.acc_database.allDocs({ include_docs: true }));
    }

    public put(id: string, document: any) {
        document._id = document.id;
        console.log(document);
        return this.database.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document).then(() => {
                const db = this.database;
                this.database.get(document.accountId).then(function (res) {
                    // const fil =    acc.rows.filter(a => a.id === document.accountId);
                    // console.log(acc.rows);
                    console.log(res);
                    res.amount = 1000;
                    // fil._id = acc.id;
                    // fil._rev =
                    db.put(res).then((re) => {
                        console.log('asdkljfkasdbfjasbhfjkasdfbjasbdh');

                        console.log(res);
                    });
                });
            });
        }, error => {
            console.log(error);
            if (error.status === 404) {
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
            if (error.status === 404) {
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
