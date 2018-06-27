import PouchDB from 'pouchdb';

const instancePool = {};

function instance(name) {
    if (instancePool[name] === undefined) {
        instancePool[name] = new PouchDB(name, { auto_compaction: true });
    }
    return instancePool[name];
}

function remoteInstance(name) {
    const instanceName = `remote_${name}`;
    if (instancePool[instanceName] === undefined) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.couchDB && userInfo.couchDB[name]) {
            const { username, password } = userInfo.couchDB;
            instancePool[instanceName] = new PouchDB(userInfo.couchDB[name], {
                skipSetup: true,
                // auth: username && password ? { username, password } : undefined
            });
        }
    }

    return instancePool[instanceName];
}

function destroyInstance(name) {
    if (instancePool[name] !== undefined) {
        const i = instancePool[name];
        delete instancePool[name];
        delete instancePool[`remote_${name}`];

        return i.destroy();
    }
}

export const accountsDB = () => instance('account');
export const transactionsDB = () => instance('transaction');
export const categoriesDB = () => instance('category');
export const remoteAccountsDB = () => remoteInstance('accounts');
export const remoteTransactionsDB = () => remoteInstance('transactions');
export const remotecategoriesDB = () => remoteInstance('categories');
export const destroyAccountsDB = () => destroyInstance('accounts');
export const destroyTransactionsDB = () => destroyInstance('transactions');
export const destroycategoriesDB = () => destroyInstance('category');
