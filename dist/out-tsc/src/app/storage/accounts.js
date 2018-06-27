"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pouchdb_1 = require("./pouchdb");
var Account_1 = require("../Models/Account");
exports.default = {
    sync: sync,
    loadAll: loadAll,
    save: save,
    archive: archive,
    mutateBalance: mutateBalance,
    remove: remove,
    destroy: destroy
};
function sync(readOnly) {
    if (readOnly === void 0) { readOnly = false; }
    return __awaiter(this, void 0, void 0, function () {
        var accounts, from, to;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!pouchdb_1.remoteAccountsDB())
                        return [2 /*return*/];
                    return [4 /*yield*/, pouchdb_1.accountsDB().replicate.from(pouchdb_1.remoteAccountsDB())];
                case 1:
                    from = _a.sent();
                    if (!(from.docs_written > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, loadAll()];
                case 2:
                    accounts = _a.sent();
                    updateLastSyncedBalance(accounts);
                    _a.label = 3;
                case 3:
                    if (readOnly)
                        return [2 /*return*/];
                    return [4 /*yield*/, pouchdb_1.accountsDB().replicate.to(pouchdb_1.remoteAccountsDB())];
                case 4:
                    to = _a.sent();
                    if (!(to.docs_written > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, loadAll()];
                case 5:
                    accounts = _a.sent();
                    updateLastSyncedBalance(accounts);
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function destroy() {
    return pouchdb_1.destroyAccountsDB();
}
function loadAll() {
    return pouchdb_1.accountsDB()
        .allDocs({
        include_docs: true
    })
        .then(function (response) {
        return response.rows.map(function (row) { return row.doc; });
        // Promise.all(response.rows.map(resolveConflicts)))
    });
    // .then(docs => docs.map(Account.fromStorage))
}
function save(account) {
    return pouchdb_1.accountsDB()
        .get(account.id)
        .then(function (doc) { return pouchdb_1.accountsDB().put(__assign({}, doc, Account_1.Account.toStorage(account))); })
        .catch(function (err) {
        if (err.status !== 404)
            throw err;
        return pouchdb_1.accountsDB().put(__assign({ _id: account.id }, Account_1.Account.toStorage(account)));
    });
}
function archive(accountId) {
    return pouchdb_1.accountsDB()
        .get(accountId)
        .then(function (doc) { return pouchdb_1.accountsDB().put(__assign({}, doc, { archived: true })); });
}
function mutateBalance(_a) {
    var accountId = _a.accountId, currency = _a.currency, amount = _a.amount;
    return pouchdb_1.accountsDB()
        .get(accountId)
        .then(function (doc) { return pouchdb_1.accountsDB().put(Account_1.Account.mutateBalance(doc, currency, amount)); })
        .then(function (_a) {
        var rev = _a.rev;
        return pouchdb_1.accountsDB().get(accountId, rev);
    })
        .then(function (doc) { return Account_1.Account.fromStorage(doc); });
}
function remove(accountId) {
    return pouchdb_1.accountsDB()
        .get(accountId)
        .then(function (doc) { return pouchdb_1.accountsDB().put(__assign({}, doc, { _deleted: true })); })
        .catch(function (err) {
        if (err.status !== 404)
            throw err;
        return true;
    });
}
function updateLastSyncedBalance(accounts) {
    accounts.forEach(function (account) {
        localStorage.setItem(account.id, JSON.stringify(account.balance));
    });
}
function resolveConflicts(row) {
    return __awaiter(this, void 0, void 0, function () {
        var lastSyncedBalance, conflictedBalances;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!row.doc._conflicts)
                        return [2 /*return*/, row.doc];
                    lastSyncedBalance = JSON.parse(localStorage.getItem(row.doc._id));
                    return [4 /*yield*/, Promise.all(row.doc._conflicts.map(function (rev) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, pouchdb_1.accountsDB()
                                        .get(row.doc._id, { rev: rev })
                                        .then(function (doc) { return doc.balance; })];
                            });
                        }); }))];
                case 1:
                    conflictedBalances = _a.sent();
                    conflictedBalances.push(row.doc.balance);
                    row.doc.balance = resolveBalance(lastSyncedBalance, conflictedBalances);
                    return [2 /*return*/, Promise.all(row.doc._conflicts.map(function (rev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, pouchdb_1.accountsDB().remove(row.doc._id, rev)];
                        }); }); }))
                            .then(function () { return pouchdb_1.accountsDB().put(row.doc); })
                            .then(function () { return row.doc; })];
            }
        });
    });
}
function resolveBalance(lastSynced, conflictedBalances) {
    return Object.keys(lastSynced).reduce(function (balance, code) {
        balance[code] =
            lastSynced[code] +
                conflictedBalances.reduce(function (delta, conflicted) { return delta + (conflicted[code] - lastSynced[code]); }, 0);
        return balance;
    }, {});
}
//# sourceMappingURL=accounts.js.map