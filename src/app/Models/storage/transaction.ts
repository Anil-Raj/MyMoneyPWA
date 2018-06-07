import {
    transactionsDB,
    remoteTransactionsDB,
    destroyTransactionsDB
} from './pouchdb';
import { Transaction } from '../../Models/Transaction';
import intersection from 'lodash/intersection';
// import { read, readdir } from 'fs';

export default {
    sync,
    load,
    loadRecent,
    loadFiltered,
    save,
    remove,
    removeByAccount,
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

export function loadRecent(limit = this.recentListLimit) {
    return transactionsDB()
        .allDocs({
            include_docs: true,
            descending: true,
            startkey: 'T\uffff',
            endkey: 'T',
            // limit
        })
        .then(response => response.rows.map(row => { console.log(row); return row.doc; }))
        .then(docs => docs.map(a => this.fromStorage(a)));
}

export function loadFiltered(filters: any = {}) {
    return transactionsDB()
        .allDocs({
            include_docs: true,
            descending: true,
            startkey: filters.date ? `T${filters.date.end}-\uffff` : 'T\uffff',
            endkey: filters.date ? `T${filters.date.start}-` : 'T'
        })
        .then(response => response.rows.map(row => row.doc))
        .then(docs => filterByAccount(docs, filters.accounts))
        .then(docs => filterByTags(docs, filters.tags))
        .then(docs => docs.map(doc => this.fromStorage(doc)));
}

/**
 * Filter transactions by account.
 *
 * @param {array} docs
 * @param {Set} accounts
 * @return {array}
 */
function filterByAccount(docs, accounts) {
    if (!accounts || !accounts.size) { return docs; }

    return docs.filter(
        tx => accounts.has(tx.accountId) || accounts.has(tx.linkedAccountId)
    );
}

/**
 * Filter transactions by tag.
 *
 * @param {array} docs
 * @param {array} tags
 * @return {array}
 */
function filterByTags(docs, tags) {
    return tags && tags.length > 0
        ? docs.filter(tx => intersection(tx.tags, tags).length > 0)
        : docs;
}

export function save(transaction) {
    return transactionsDB()
        .get(transaction.id)
        .then(doc => {
            const tr = new Transaction();
            transactionsDB().put({ ...doc, ...tr.toStorage(transaction) });
        }
        )
        .catch(err => {
            if (err.status !== 404) { throw err; }
            const tr = new Transaction();
            return transactionsDB().put({
                _id: transaction.id,

                ...tr.toStorage(transaction)
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
