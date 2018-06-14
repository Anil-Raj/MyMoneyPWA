import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { Transaction } from '../Models/Transaction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { transactionsDB, categoriesDB, accountsDB } from '../Models/storage/pouchdb';
import { Category } from '../Models/Category';
import { environment } from '../../environments/environment';

@Injectable()
export class PouchDBService {

    private isInstantiated: boolean;
    private cat_database: any;
    private acc_database: any;
    private database: any;
    private remote = environment.remote;

    private listener: EventEmitter<any> = new EventEmitter();
    public constructor() {
        if (!this.isInstantiated) {
            this.cat_database = new PouchDB('category');
            this.acc_database = new PouchDB('account');
            this.database = new PouchDB('transaction');
            this.isInstantiated = true;
            const cat = new Category();
            this.cat_database.bulkDocs([
                {
                    Name: 'Cloth', Kind: 0, Type: 'Expense', _id: 'C0',
                    Icon: '/assets/myicons/ml/icon_17.png'
                },
                {
                    Name: 'Travel', Kind: 0, Type: 'Expense', _id: 'C1',
                    Icon: '/assets/myicons/ml/ic_category_travel.png'
                },
                {
                    Name: 'Salary', Kind: 1, Type: 'Income', _id: 'C3',
                    Icon: '/assets/myicons/ml/ic_category_salary.png'
                },
                {
                    Name: 'Interest Money', Kind: 1, Type: 'Income', _id: 'C4',
                    Icon: '/assets/myicons/ml/ic_category_interestmoney.png',
                }
            ]).then(function (result) {
                // handle result
            }).catch(function (err) {
                console.log(err);
            });

            this.acc_database.bulkDocs([
                { _id: 'account_1', Name: 'HDFC A/C', amount: 0 },
                { _id: 'account_2', Name: 'Cash', amount: 0 }
            ]).then(function (result) {
                // handle result
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

    public fetch() {
        console.log(this.cat_database);

        return this.database.allDocs({ include_docs: true });
    }
    public get_tr_for_acc(ac): any {
        console.log('aaaaaaaaaaaaaaaaaaaaaa');

        const user = JSON.parse(localStorage.getItem('userInfo'));
        console.log(user.couchDB.transactions);
        const remote_db = new PouchDB('http://127.0.0.1:5984/transaction1234');
        console.log(remote_db);
        this.database.replicate.to(remote_db).on('complete', function () {
            // yay, we're done!
        }).on('error', function (err) {
            // boo, something went wrong!
        });


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
    public put_cat(id: string, document: any) {
        document._id = document.id;
        console.log(document);
        return this.cat_database.get(id).then(result => {
            document._rev = result._rev;
            return this.cat_database.put(document).then(() => {
                const db = this.cat_database;
                this.cat_database.get(document.accountId).then(function (res) {
                    console.log(res);
                    res.amount = 1000;
                    db.put(res).then((re) => {
                        console.log('asdkljfkasdbfjasbhfjkasdfbjasbdh');
                        console.log(res);
                    });
                });
            });
        }, error => {
            console.log(error);
            if (error.status === 404) {
                return this.cat_database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    public put(id: string, document: any) {
        document._id = document.id;
        console.log(document);
        return this.database.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document).then(() => {
                const db = this.acc_database;
                db.get(document.accountId).then(function (res) {
                    console.log(res);
                    res.amount += document.amount;
                    db.put(res).then((re) => {
                        console.log('asdkljfkasdbfjasbhfjkasdfbjasbdh');

                        console.log(res);
                    });
                });
            });
        }, error => {
            console.log(error);
            if (error.status === 404) {
                return this.database.put(document).then(() => {
                    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
                    console.log(document.accountId);
                    let result;
                    this.acc_database.get(document.accountId).then(function (res) {
                        console.log('bbbbbbbbbbbbbbbb');
                        console.log('vvvvvv');
                        console.log(res);
                        res.amount += document.amount;
                        this.acc_database.put(res).then((re) => {
                        result = re;

                            console.log(res);
                        });
                    }, err => {
                        console.log(err);
                        if (err.status === 404) {
                            return this.acc_database.put(result).then(() => {

                            });
                        }
                    });
                });
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
        const options = {
            live: false,
            retry: false,
            continuous: false
        };
        // remote = ''
        this.cat_database.sync(this.remote + 'category' + remote, options);
        this.acc_database.sync(this.remote + 'account' + remote, options);
        this.database.sync(this.remote + 'transaction' + remote, options);
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
    public del_cat(id: string) {
        console.log(document);
        return this.cat_database.get(id).then(result => {
            result._deleted = true;
            return this.cat_database.put(result);
        }, error => {
            if (error.status === 404) {
                return this.cat_database.put(document);
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

    public loadRecent() {
        return categoriesDB()
            .allDocs({
                include_docs: true,
                descending: true,
                // startkey: 'T\uffff',
                // endkey: 'T',
                // limit
            })
            .then(response => { console.log(response); response.rows.map(row => { console.log(row); return row.doc; }); });
        // .then(docs => docs.map(a => this.fromStorage(a)));
    }

}
