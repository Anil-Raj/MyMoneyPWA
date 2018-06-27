import {
    transactionsDB,
    remoteTransactionsDB,
    destroyTransactionsDB
} from './pouchdb';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService {
    public async sync(readOnly = true) {
        readOnly = false;
        console.log('inside sync');
        console.log(!remoteTransactionsDB());
        console.log(readOnly);
        console.log('newdb');

        const ab = await transactionsDB().replicate.to(remoteTransactionsDB());
        console.log(ab);

        if (!remoteTransactionsDB()) { return; }
        const options = { batch_size: 500 };
        // if (!readOnly) {



        // }
        const a = await transactionsDB()
            .replicate.from(remoteTransactionsDB())
            .on('change', async update => {
                console.log(update);

                await Promise.all(update.docs.map(this.processIncomingTransaction));
            });
        console.log(a);



    }

    public async  processIncomingTransaction(tx) {
        if (tx._id.startsWith('T') && !tx._id.includes('-') && !tx._deleted) {
            await this.save({
                ...tx,
                id: `T${tx.date}-${tx._id.substr(1)}`,
                date: undefined,
                tags: tx.tags && tx.tags.length ? tx.tags : undefined,
                note: tx.note && tx.note.length ? tx.note : undefined
            });
            await transactionsDB().remove(tx);
        }

        return tx;
    }

    public loadAll() {
        return transactionsDB()
            .allDocs({
                include_docs: true
            })
            .then(response => {
                console.log('res', response.rows);
                return response.rows.map(row => row.doc);
            })
        //   .then(docs => docs.map(Transaction.fromStorage))
    }

    public load(id) {
        return transactionsDB()
            .get(id)
            .then(response => response)
            .catch(error => {
                if (error.status !== 404) { throw error; }
            });
    }

    /**
     * Filter transactions by account.
     *
     * @param {array} docs
     * @param {Set} accounts
     * @return {array}
     */
    public filterByAccount(docs, accounts) {
        console.log(docs);
        console.log(accounts);

        return docs.filter(
            tx => tx.accountId == accounts.map(ac => ac.id)
        );
    }

    public save(transaction) {
        return transactionsDB()
            .get(transaction.id)
            .then(doc => {
                transactionsDB().put({ ...doc, ...transaction });
            }
            )
            .catch(err => {
                if (err.status !== 404) { throw err; }
                return transactionsDB().put({
                    _id: transaction.id,
                    ...transaction
                });
            });
    }

    public remove(id) {
        if (!id) { return false; }

        return transactionsDB()
            .get(id)
            .then(doc =>
                transactionsDB()
                    .put({ ...doc, _deleted: true })
                    .then(() => doc)
            )
            .catch(err => {
                if (err.status !== 404) { throw err; }
                return false;
            });
    }

    public async  removeByAccount(accountId) {
        return true;
    }

    public destroy() {
        return destroyTransactionsDB();
    }

}
