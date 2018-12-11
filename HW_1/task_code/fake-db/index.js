let db = [
    {
        "id": "123",
        "firstName": "Alex",
        "lastName": "Hall",
        "company": "OBS",
        "position": "Postman",
        "email": "ahall@obs.com",
        "phoneNumber": "+46577894563"
    },
    {
        "id": "234",
        "firstName": "Anastasiia",
        "lastName": "Hall",
        "company": "OBS",
        "position": "Postman",
        "email": "ahall@obs.com",
        "phoneNumber": "+46577894563"
    }
];

function makeId() {
    let id = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 36; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    return id;
}

module.exports = {

    getCollection(cb) {
        cb(null, db);
    },
    getById(id, cb) {
        let matchedEntries = db.filter(entry => entry.id === id);

        if (matchedEntries.length) {
            cb(null, matchedEntries[0]);
        } else {
            cb(new Error('There is no such record in DB'), null);
        }
    },
    create(model, cb) {
        model.id = makeId();
        db.push(model);

        cb(null, model);
    },
    update(model, cb) {
        let matchedModel = db.filter(entry => entry.id === model.id)[0];

        if (matchedModel) {
            db[db.indexOf(matchedModel)] = model;
            cb(null, model);
        } else {
            cb(new Error('There is no such controllers'), null)
        }
    },
    remove(id, cb) {
        let matchedModel = db.filter(entry => entry.id === id)[0];

        if (matchedModel) {
            db.splice(db.indexOf(matchedModel), 1);
            cb(null);
        } else {
            cb(new Error('There is no such controllers'))
        }
    }
};


