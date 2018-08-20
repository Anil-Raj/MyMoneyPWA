import { accountsDB, remoteAccountsDB, destroyAccountsDB } from './pouchdb'
import { Account } from '../Models/Account'
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  public async  sync(readOnly = false) {
    if (!remoteAccountsDB()) return
    let accounts

    const from = await accountsDB().replicate.from(remoteAccountsDB())
    if (from.docs_written > 0) {
      accounts = await this.loadAll()
      this.updateLastSyncedBalance(accounts)
    }

    if (readOnly) return

    const to = await accountsDB().replicate.to(remoteAccountsDB())
    if (to.docs_written > 0) {
      accounts = await this.loadAll()
      this.updateLastSyncedBalance(accounts)
    }
  }

  public destroy() {
    return destroyAccountsDB()
  }

  public loadAll() {
    return accountsDB()
      .allDocs({
        include_docs: true
      })
      .then(response => {
        return response.rows.map(row => row.doc);
        // Promise.all(response.rows.map(resolveConflicts)))
      })
    // .then(docs => docs.map(Account.fromStorage))
  }

  public save(account) {
    return accountsDB()
      .get(account.id)
      .then(doc => accountsDB().put({ ...doc, ...Account.toStorage(account) }))
      .catch(err => {
        if (err.status !== 404) throw err
        return accountsDB().put({
          _id: account.id,
          ...Account.toStorage(account)
        })
      })
  }

  public mutateBalance({ accountId, currency, amount }) {
    return accountsDB()
      .get(accountId)
      .then(doc => accountsDB().put(Account.mutateBalance(doc, currency, amount)))
      .then(({ rev }) => accountsDB().get(accountId, rev))
      .then(doc => Account.fromStorage(doc))
  }

  public remove(accountId) {
    return accountsDB()
      .get(accountId)
      .then(doc => accountsDB().put({ ...doc, _deleted: true }))
      .catch(err => {
        if (err.status !== 404) throw err
        return true
      })
  }

  public updateLastSyncedBalance(accounts) {
    accounts.forEach(account => {
      localStorage.setItem(account.id, JSON.stringify(account.balance))
    })
  }


}
