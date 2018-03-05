import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import { Transaction } from '../../../Models/Transaction';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

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
                { title: 'Lisa Says', _id: 'doc1' },
                { title: 'Space Oddity', _id: 'doc2' }
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
        return this.database.get(id);
    }

    public put(id: string, document: any) {
        document._id = id;
        console.log(document);
        return this.get(id).then(result => {
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
    public getDoc(id: string) {
        // return this.database.allDocs(
        //     {startkey: id , endkey: id + '\uffff' , include_docs: true},
        //     function(err, docs) {
        //         if(!err){
        //             console.log(Array.of(docs.rows));

        //             return Array.of(docs.rows);
        //         }
        //     });
        return Observable.from(this.database.allDocs());

    }
    public sync(remote: string) {
        let remoteDatabase = new PouchDB(remote);
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

}
