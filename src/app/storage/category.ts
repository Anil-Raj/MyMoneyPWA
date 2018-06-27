import { categoriesDB, remoteAccountsDB, destroyAccountsDB } from './pouchdb'
import { Account } from '../Models/Account'
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
    public async sync(readOnly = false) {
        if (!remoteAccountsDB()) return
        let category

        const from = await categoriesDB().replicate.from(remoteAccountsDB())
        if (from.docs_written > 0) {
            category = await this.loadAll()
            this.updateLastSyncedBalance(category)
        }

        if (readOnly) return

        const to = await categoriesDB().replicate.to(remoteAccountsDB())
        if (to.docs_written > 0) {
            category = await this.loadAll()
            this.updateLastSyncedBalance(category)
        }
    }

    public destroy() {
        return destroyAccountsDB()
    }

    public loadAll() {
        return categoriesDB()
            .allDocs({
                include_docs: true
            })
            .then(response => {
                return response.rows.map(row => row.doc);
                // Promise.all(response.rows.map(resolveConflicts)))
            })
        // .then(docs => docs.map(Account.fromStorage))
    }
    public load(id) {
        return categoriesDB()
            .get(id)
            .then(response=>response)
            .catch(error => {
                if (error.status !== 404) { throw error; }
            });
    }
    public save(category) {
        return categoriesDB()
            .get(category.id)
            .then(doc => categoriesDB().put({ ...doc, ...Account.toStorage(category) }))
            .catch(err => {
                if (err.status !== 404) throw err
                return categoriesDB().put({
                    _id: category.id,
                    ...Account.toStorage(category)
                })
            })
    }

    public mutateBalance({ categoryId, currency, amount }) {
        return categoriesDB()
            .get(categoryId)
            .then(doc => categoriesDB().put(Account.mutateBalance(doc, currency, amount)))
            .then(({ rev }) => categoriesDB().get(categoryId, rev))
            .then(doc => Account.fromStorage(doc))
    }

    public remove(categoryId) {
        return categoriesDB()
            .get(categoryId)
            .then(doc => categoriesDB().put({ ...doc, _deleted: true }))
            .catch(err => {
                if (err.status !== 404) throw err
                return true
            })
    }

    public updateLastSyncedBalance(category) {
        category.forEach(category => {
            localStorage.setItem(category.id, JSON.stringify(category.balance))
        })
    }


}
