var Promise = require("promise"),
    Datastore = require('nedb-core'),
    db = new Datastore({
        filename: './data.db',
        autoload: true
    });

//iniatiate a Object
function custom_func() {

}

custom_func.prototype.saveTicker = function (doc) {
    return new Promise(function (resolve, reject) {
         db.insert(doc, function (err, newDoc) {
            if (!err) {
                resolve(newDoc);
                console.log(newDoc);
            } else {
                reject("error came while insert");
            }
        });
    });
}

custom_func.prototype.getTicker = function (param) {
    return new Promise(function (resolve, reject) {
        db.find(param).exec(function (err, docs) {
            if (!err && docs.length === 0 || !docs[0]._id) {
                reject("Docs not found!");
            }
            resolve(docs);
        });
    });

}

custom_func.prototype.subscribe = function (param) {
    return new Promise(function (resolve, reject) {
        db.find(param).exec(function (err, docs) {
            if (!err && docs.length === 0 || !docs[0]._id) {
                reject("Docs not found!");
            }
            resolve(docs);
        });
    });

}

custom_func.prototype.unsubscribe = function (param) {
    return new Promise(function (resolve, reject) {
        db.find(param).exec(function (err, docs) {
            if (!err && docs.length === 0 || !docs[0]._id) {
                reject("Docs not found!");
            }
            resolve(docs);
        });
    });

}

custom_func.prototype.socketEmit = function (param) {
    return new Promise(function (resolve, reject) {
        db.find(param).exec(function (err, docs) {
            if (!err && docs.length === 0 || !docs[0]._id) {
                reject("Docs not found!");
            }
            resolve(docs);
        });
    });

}

module.exports = custom_func;