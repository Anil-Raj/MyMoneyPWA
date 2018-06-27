"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pouchdb_1 = require("pouchdb");
var instancePool = {};
function instance(name) {
    if (instancePool[name] === undefined) {
        instancePool[name] = new pouchdb_1.default(name, { auto_compaction: true });
        console.log('new');
    }
    console.log('created new instance', instancePool[name]);
    return instancePool[name];
}
function remoteInstance(name) {
    var instanceName = "remote_" + name;
    if (instancePool[instanceName] === undefined) {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.couchDB && userInfo.couchDB[name]) {
            var _a = userInfo.couchDB, username = _a.username, password = _a.password;
            instancePool[instanceName] = new pouchdb_1.default(userInfo.couchDB[name], {
                skipSetup: true,
            });
        }
    }
    return instancePool[instanceName];
}
function destroyInstance(name) {
    if (instancePool[name] !== undefined) {
        var i = instancePool[name];
        delete instancePool[name];
        delete instancePool["remote_" + name];
        return i.destroy();
    }
}
exports.accountsDB = function () { return instance('account'); };
exports.transactionsDB = function () { return instance('transaction'); };
exports.categoriesDB = function () { return instance('category'); };
exports.remoteAccountsDB = function () { return remoteInstance('accounts'); };
exports.remoteTransactionsDB = function () { return remoteInstance('transactions'); };
exports.remotecategoriesDB = function () { return remoteInstance('categories'); };
exports.destroyAccountsDB = function () { return destroyInstance('accounts'); };
exports.destroyTransactionsDB = function () { return destroyInstance('transactions'); };
exports.destroycategoriesDB = function () { return destroyInstance('category'); };
//# sourceMappingURL=pouchdb.js.map