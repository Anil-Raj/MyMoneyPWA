import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { transactionsDB, categoriesDB } from '../../storage/pouchdb';
import { Category } from '../../../Models/Category';
// import { userInfo } from 'os';

@Injectable()
export class PouchDBService {

    private isInstantiated: boolean;
    private cat_database: any;
    private acc_database: any;
    private database: any;
    private remote = 'http://127.0.0.1:5984/';

    private listener: EventEmitter<any> = new EventEmitter();
    public constructor() {
        if (!this.isInstantiated) {
            this.cat_database = new PouchDB('category');
            this.acc_database = new PouchDB('account');
            this.database = new PouchDB('transaction');
            this.isInstantiated = true;
            const cat = new Category();
            // let c1, c2, c3, c4, c5: any;
            // c1 = cat.fromForm({
            //     Name: 'Cloth', Kind: 0, Type: 'Expense', _id: 'C0',
            //     Icon: '/assets/myicons/ml/icon_17.png'
            // });
            // c2 = cat.fromForm({
            //     Name: 'Travel', Kind: 0, Type: 'Expense', _id: 'C1',
            //     Icon: '/assets/myicons/ml/ic_category_travel.png'
            // });
            // c3 = cat.fromForm({
            //     Name: 'Travel', Kind: 0, Type: 'Expense', _id: 'C2',
            //     Icon: '/assets/myicons/ml/ic_category_travel.png'
            // });
            // c4 = cat.fromForm({
            //     Name: 'Salary', Kind: 1, Type: 'Income', _id: 'C3',
            //     Icon: '/assets/myicons/ml/ic_category_salary.png'
            // });
            // c5 = cat.fromForm({
            //     Name: 'Interest Money', Kind: 1, Type: 'Income', _id: 'C4',
            //     Icon: '/assets/myicons/ml/ic_category_interestmoney.png',
            // });
            // console.log(c1, c2, c3, c4, c5);

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
        // console.log('adasdfasdf');

        // console.log(this.cat_database);
        console.log('aaaaaaaaaaaaaaaaaaaaaa');

        const user = JSON.parse(localStorage.getItem('userInfo'));
        console.log(user.couchDB['transaction']);
        const remote_db = new PouchDB('http://127.0.0.1:5984/transaction12340987');
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
        const options = {
            live: false,
            retry: false,
            continuous: false
        };
        // remote = ''
        this.cat_database.sync(this.remote + 'category' + remote, options);
        this.acc_database.sync(this.remote + 'account' + remote, options);
        this.database.sync(this.remote + 'transaction' + remote, options);
        // const remoteDatabase = new PouchDB(this.remote);
        // this.database.sync(remoteDatabase, {
        //     live: true
        // }).on('change', change => {
        //     this.listener.emit(change);
        // }).on('error', error => {
        //     console.error(JSON.stringify(error));
        // });
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
