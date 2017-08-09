//var app = require("../express");

module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    // http handlers
    app.post("/api/user", createUser);
    app.get("/api/user", handleGetQuery);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var userDbModel = function () {
        return require('../model/user/user.model.server');
    };

    function handleGetQuery(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        console.log("hey-handleGet");

        if (password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req, res);
        }
        else {
            res.status(404);
        }
    }
    
    function createUser(req, res) {
        userDbModel
            .createUser(req.body)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (err) {
               console.log(err);
               res.status(500);
            });

        /*
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.json(user);
        */
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        userDbModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            });

        /*
        for (var u in users) {
            if (users[u].username === username) {
                res.json(users[u]);
                return;
            }
        }

        res.sendStatus(404);
        */
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userDbModel
            .findUserByUsername(username, password)
            .then(function (user) {
                res.json(user);
            });

        /*
        if (username && password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    console.log("hey-found");
                    console.log(_user._id);
                    res.json(_user);
                    return;
                }
            }
            res.sendStatus(404);
        } else if (username) {
            for (var u in users) {
                if (users[u].username === username) {
                    res.json(users[u]);
                    return;
                }
            }
        }
        console.log("hey-notfound");
        res.json("0");*/
    }

    function findUserById(req, res) {
        userDbModel
            .findUserById(req.params.userId)
            .then(function (user) {
                if (!!user) {
                    res.json(user);
                }
            })
            .catch(function (err) {
                res.status(err);
            });

        /*
        var userId = req.params.userId;

        for (var u in users) {
            if (users[u]._id === userId) {
                res.json(users[u]);
                return;
            }
        }
        res.sendStatus(404);
        */
    }

    function updateUser(req, res) {
        userDbModel
            .updateUser(req.params.userId, req.body)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });
        
        /*
        var userId = req.params.userId;
        var user = req.body;

        for (var u in users) {
            if (users[u]._id === userId) {
                users[u] = user;
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
        */
    }

    function deleteUser(req, res) {
        userDbModel
            .deleteUser(req.params.userId)
            .then(function () {
               res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });

        /*
        var userId = req.params.userId;

        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                return;
            }
        }
        */
    }
};