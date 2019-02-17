var ObjectId = require('mongodb').ObjectId;
const fs = require('fs');

module.exports = function(app, db) {
    app.get('/', (req, res) => {
        res.send("hi");
    })

    app.post('/hourglass_db/', (req, res) => {
        console.log('sup')
        var type = req.body.type;
        var todo = req.body.todo;
        if (type == "user") {
            if (todo == "register") {
                var reg = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    username: req.body.username
                }
                db.collection('users').insert(reg, (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("Registered " + JSON.stringify(reg))
                    }
                })
                return
            } else if (todo == "login") {
                var userQuery = {
                    username: req.body.username,
                    password: req.body.password
                }
                db.collection('users').findOne(userQuery, (err, item) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(item)
                    }
                })
                return
            } else if (todo == "getAllUsers") {
              db.collection('users').find({}).toArray(function(err, docs) {
                if (err) {
                    throw err;
                } else {
                    res.send(docs);
                };
              });
              return;
            }
        }
    })
}
