import {
    transactionsDB,
    remoteTransactionsDB,
    destroyTransactionsDB
} from './pouchdb';
import { Transaction } from '../Models/Transaction';
import intersection from 'lodash/intersection';
// import { read, readdir } from 'fs';

export default {
    sync,
    load,
    save,
    remove,
    removeByAccount,
    filterByAccount,
    destroy
};

export async function sync(readOnly = true) {
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
    const a  = await transactionsDB()
        .replicate.from(remoteTransactionsDB())
        .on('change', async update => {
            console.log(update);

            await Promise.all(update.docs.map(processIncomingTransaction));
        });
        console.log(a);



}

export async function processIncomingTransaction(tx) {
    if (tx._id.startsWith('T') && !tx._id.includes('-') && !tx._deleted) {
        await save({
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

export function load(id) {
    return transactionsDB()
        .get(id)
        .then(this.fromStorage)
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
export function filterByAccount(docs, accounts) {
    console.log(docs);
    console.log(accounts);
    
    return docs.filter(
        tx => tx.accountId == accounts.map(ac=>ac.id)
    );
}

export function save(transaction) {
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

export function remove(id) {
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

export async function removeByAccount(accountId) {
    return true;
}

export function destroy() {
    return destroyTransactionsDB();
}
