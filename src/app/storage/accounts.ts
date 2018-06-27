import { accountsDB, remoteAccountsDB, destroyAccountsDB } from './pouchdb'
import {Account} from '../Models/Account'

export default {
  sync,
  loadAll,
  save,
  mutateBalance,
  remove,
  destroy
}

async function sync(readOnly = false) {
  if (!remoteAccountsDB()) return
  let accounts

  const from = await accountsDB().replicate.from(remoteAccountsDB())
  if (from.docs_written > 0) {
    accounts = await loadAll()
    updateLastSyncedBalance(accounts)
  }

  if (readOnly) return

  const to = await accountsDB().replicate.to(remoteAccountsDB())
  if (to.docs_written > 0) {
    accounts = await loadAll()
    updateLastSyncedBalance(accounts)
  }
}

function destroy() {
  return destroyAccountsDB()
}

function loadAll() {
  return accountsDB()
    .allDocs({
      include_docs: true
    })
    .then(response => {
        return response.rows.map(row=>row.doc);
        // Promise.all(response.rows.map(resolveConflicts)))
    })
    // .then(docs => docs.map(Account.fromStorage))
}

function save(account) {
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

function mutateBalance({ accountId, currency, amount }) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put(Account.mutateBalance(doc, currency, amount)))
    .then(({ rev }) => accountsDB().get(accountId, rev))
    .then(doc => Account.fromStorage(doc))
}

function remove(accountId) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}

function updateLastSyncedBalance(accounts) {
  accounts.forEach(account => {
    localStorage.setItem(account.id, JSON.stringify(account.balance))
  })
}

