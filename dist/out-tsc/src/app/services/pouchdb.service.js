"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/from");
var pouchdb_1 = require("pouchdb");
pouchdb_1.default.plugin(pouchdb_find_1.default);
var pouchdb_find_1 = require("pouchdb-find");
var Category_1 = require("../Models/Category");
var pouchdb_2 = require("../storage/pouchdb");
var environment_1 = require("../../environments/environment");
var Account_1 = require("../Models/Account");
var PouchDBService = /** @class */ (function () {
    function PouchDBService() {
        this.remote = environment_1.environment.REMOTE;
        this.listener = new core_1.EventEmitter();
        if (!this.isInstantiated) {
            this.cat_database = new pouchdb_1.default('category');
            this.acc_database = new pouchdb_1.default('account');
            this.database = new pouchdb_1.default('transaction');
            this.isInstantiated = true;
            var cat = new Category_1.Category();
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
            // this.acc_database.bulkDocs([
            //     {
            //         id: 'A12345',
            //         name: 'Test',
            //         group: 'cash',
            //         balance: {
            //             USD: 10095,
            //             JPY: 2200
            //         },
            //         currencies: ["USD", "EUR", "JPY"]
            //     }
            //     // { _id: 'account_2', Name: 'Cash', amount: 0 }
            // ]).then(function (result) {
            //     // handle result
            // }).catch(function (err) {
            //     console.log(err);
            // });
        }
    }
    PouchDBService.prototype.fetch = function () {
        console.log(this.cat_database);
        return this.database.allDocs({ include_docs: true });
    };
    PouchDBService.prototype.get_tr_for_acc = function (ac) {
        console.log('aaaaaaaaaaaaaaaaaaaaaa');
        var user = JSON.parse(localStorage.getItem('userInfo'));
        console.log(user.couchDB.transactions);
        var remote_db = new pouchdb_1.default('http://127.0.0.1:5984/transaction1234');
        console.log(remote_db);
        this.database.replicate.to(remote_db).on('complete', function () {
            // yay, we're done!
        }).on('error', function (err) {
            // boo, something went wrong!
        });
        return Observable_1.Observable.from(this.database.find({ selector: { accountId: ac._id } }));
    };
    PouchDBService.prototype.get = function () {
        return Observable_1.Observable.from(this.database.allDocs({ include_docs: true }));
    };
    PouchDBService.prototype.get_cat = function () {
        return Observable_1.Observable.from(this.cat_database.allDocs({ include_docs: true }));
    };
    PouchDBService.prototype.get_acc = function () {
        return Observable_1.Observable.from(this.acc_database.allDocs({ include_docs: true }));
    };
    PouchDBService.prototype.put_cat = function (id, document) {
        var _this = this;
        document._id = document.id;
        console.log(document);
        return this.cat_database.get(id).then(function (result) {
            document._rev = result._rev;
            return _this.cat_database.put(document).then(function () {
                var db = _this.cat_database;
                _this.cat_database.get(document.accountId).then(function (res) {
                    console.log(res);
                    res.amount = 1000;
                    db.put(res).then(function (re) {
                        console.log('asdkljfkasdbfjasbhfjkasdfbjasbdh');
                        console.log(res);
                    });
                });
            });
        }, function (error) {
            console.log(error);
            if (error.status === 404) {
                return _this.cat_database.put(document);
            }
            else {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            }
        });
    };
    // public put_acc(id: string, document: any) {
    //     document._id = document.id;
    //     console.log(document);
    //     return this.acc_database.get(id).then(result => {
    //         document._rev = result._rev;
    //         return this.database.put(document);
    //     });
    // }
    // public put_acc(account) {
    //     return this.acc_database
    //         .get(account.id)
    //         .then(doc => {
    //             console.log(doc);
    //             this.acc_database.put({ ...doc, ...Account.toStorage(account) });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             if (err.status !== 404) {
    //                 throw err
    //             }
    //             return this.acc_database.put({
    //                 _id: account.id,
    //                 ...Account.toStorage(account)
    //             })
    //         })
    // }
    PouchDBService.prototype.mutateBalance = function (_a) {
        var _this = this;
        var accountId = _a.accountId, currency = _a.currency, amount = _a.amount;
        this.acc_database
            .get(accountId)
            .then(function (doc) {
            console.log(doc);
            console.log(Account_1.Account.mutateBalance(doc, currency, amount));
            return _this.acc_database.put(Account_1.Account.mutateBalance(doc, currency, amount));
        }).then(function (rev) {
            console.log(rev);
            return _this.acc_database.get(accountId, rev.rev);
        })
            .then(function (doc) {
            console.log(doc);
            return Account_1.Account.fromStorage(doc);
        });
    };
    PouchDBService.prototype.save = function (account) {
        return pouchdb_2.accountsDB()
            .get(account.id)
            .then(function (doc) { return pouchdb_2.accountsDB().put(__assign({}, doc, Account_1.Account.toStorage(account))); })
            .catch(function (err) {
            if (err.status !== 404)
                throw err;
            return pouchdb_2.accountsDB().put(__assign({ _id: account.id }, Account_1.Account.toStorage(account)));
        });
    };
    PouchDBService.prototype.put = function (id, document) {
        var _this = this;
        document._id = document.id;
        console.log(document);
        return this.database.get(id).then(function (result) {
            result = document;
            return _this.database.put(document);
            // .then(() => {
            //     const db = this.acc_database;
            //     db.get(document.accountId).then(function (res) {
            //         console.log(res);
            //         res.amount += document.amount;
            //         db.put(res).then((re) => {
            //             console.log('asdkljfkasdbfjasbhfjkasdfbjasbdh');
            //             console.log(res);
            //         });
            //     });
            // });
        }, function (error) {
            console.log(error);
            if (error.status === 404) {
                return _this.database.put(document);
                // .then(() => {
                //     let result;
                //     this.acc_database.get(document.accountId).then(function (res) {
                //         console.log('bbbbbbbbbbbbbbbb');
                //         console.log('vvvvvv');
                //         console.log(res);
                //         res.amount += document.amount;
                //         this.acc_database.put(res).then((re) => {
                //             result = re;
                //             console.log(res);
                //         });
                //     }, err => {
                //         console.log(err);
                //         if (err.status === 404) {
                //             return this.acc_database.put(result).then(() => {
                //             });
                //         }
                //     });
                // });
            }
            else {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            }
        });
    };
    PouchDBService.prototype.getDoc = function (id) {
        return Observable_1.Observable.from(this.database.allDocs({ startkey: id, endkey: id + '\uffff', include_docs: true }));
    };
    PouchDBService.prototype.sync = function (remote) {
        var options = {
            live: false,
            retry: false,
            continuous: false,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        };
        // remote = ''
        this.cat_database.sync(this.remote + 'category' + remote, options);
        this.acc_database.sync(this.remote + 'account' + remote, options);
        this.database.sync(this.remote + 'transaction' + remote, options);
    };
    PouchDBService.prototype.del = function (id) {
        var _this = this;
        console.log(document);
        return this.database.get(id).then(function (result) {
            result._deleted = true;
            return _this.database.put(result);
        }, function (error) {
            if (error.status === 404) {
                return _this.database.put(document);
            }
            else {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            }
        });
    };
    PouchDBService.prototype.del_cat = function (id) {
        var _this = this;
        console.log(document);
        return this.cat_database.get(id).then(function (result) {
            result._deleted = true;
            return _this.cat_database.put(result);
        }, function (error) {
            if (error.status === 404) {
                return _this.cat_database.put(document);
            }
            else {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            }
        });
    };
    PouchDBService.prototype.getChangeListener = function () {
        return this.listener;
    };
    PouchDBService.prototype.loadRecent = function () {
        return pouchdb_2.categoriesDB()
            .allDocs({
            include_docs: true,
            descending: true,
        })
            .then(function (response) { console.log(response); response.rows.map(function (row) { console.log(row); return row.doc; }); });
        // .then(docs => docs.map(a => this.fromStorage(a)));
    };
    PouchDBService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PouchDBService);
    return PouchDBService;
}());
exports.PouchDBService = PouchDBService;
//# sourceMappingURL=pouchdb.service.js.map