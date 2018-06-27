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
// import { read, readdir } from 'fs';
exports.default = {
    sync: sync,
    load: load,
    loadAll: loadAll,
    save: save,
    remove: remove,
    removeByAccount: removeByAccount,
    filterByAccount: filterByAccount,
    destroy: destroy
};
function sync(readOnly) {
    if (readOnly === void 0) { readOnly = true; }
    return __awaiter(this, void 0, void 0, function () {
        var ab, options, a;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    readOnly = false;
                    console.log('inside sync');
                    console.log(!pouchdb_1.remoteTransactionsDB());
                    console.log(readOnly);
                    console.log('newdb');
                    return [4 /*yield*/, pouchdb_1.transactionsDB().replicate.to(pouchdb_1.remoteTransactionsDB())];
                case 1:
                    ab = _a.sent();
                    console.log(ab);
                    if (!pouchdb_1.remoteTransactionsDB()) {
                        return [2 /*return*/];
                    }
                    options = { batch_size: 500 };
                    return [4 /*yield*/, pouchdb_1.transactionsDB()
                            .replicate.from(pouchdb_1.remoteTransactionsDB())
                            .on('change', function (update) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(update);
                                        return [4 /*yield*/, Promise.all(update.docs.map(processIncomingTransaction))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    a = _a.sent();
                    console.log(a);
                    return [2 /*return*/];
            }
        });
    });
}
exports.sync = sync;
function processIncomingTransaction(tx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tx._id.startsWith('T') && !tx._id.includes('-') && !tx._deleted)) return [3 /*break*/, 3];
                    return [4 /*yield*/, save(__assign({}, tx, { id: "T" + tx.date + "-" + tx._id.substr(1), date: undefined, tags: tx.tags && tx.tags.length ? tx.tags : undefined, note: tx.note && tx.note.length ? tx.note : undefined }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pouchdb_1.transactionsDB().remove(tx)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, tx];
            }
        });
    });
}
exports.processIncomingTransaction = processIncomingTransaction;
function loadAll() {
    return pouchdb_1.transactionsDB()
        .allDocs({
        include_docs: true
    })
        .then(function (response) {
        console.log('res', response.rows);
        return response.rows.map(function (row) { return row.doc; });
    });
    //   .then(docs => docs.map(Transaction.fromStorage))
}
exports.loadAll = loadAll;
function load(id) {
    return pouchdb_1.transactionsDB()
        .get(id)
        .then(this.fromStorage)
        .catch(function (error) {
        if (error.status !== 404) {
            throw error;
        }
    });
}
exports.load = load;
/**
 * Filter transactions by account.
 *
 * @param {array} docs
 * @param {Set} accounts
 * @return {array}
 */
function filterByAccount(docs, accounts) {
    console.log(docs);
    console.log(accounts);
    return docs.filter(function (tx) { return tx.accountId == accounts.map(function (ac) { return ac.id; }); });
}
exports.filterByAccount = filterByAccount;
function save(transaction) {
    return pouchdb_1.transactionsDB()
        .get(transaction.id)
        .then(function (doc) {
        pouchdb_1.transactionsDB().put(__assign({}, doc, transaction));
    })
        .catch(function (err) {
        if (err.status !== 404) {
            throw err;
        }
        return pouchdb_1.transactionsDB().put(__assign({ _id: transaction.id }, transaction));
    });
}
exports.save = save;
function remove(id) {
    if (!id) {
        return false;
    }
    return pouchdb_1.transactionsDB()
        .get(id)
        .then(function (doc) {
        return pouchdb_1.transactionsDB()
            .put(__assign({}, doc, { _deleted: true }))
            .then(function () { return doc; });
    })
        .catch(function (err) {
        if (err.status !== 404) {
            throw err;
        }
        return false;
    });
}
exports.remove = remove;
function removeByAccount(accountId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, true];
        });
    });
}
exports.removeByAccount = removeByAccount;
function destroy() {
    return pouchdb_1.destroyTransactionsDB();
}
exports.destroy = destroy;
//# sourceMappingURL=transaction.js.map