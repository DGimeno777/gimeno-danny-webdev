module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    // http handlers
    /*app.post("/api/user", createUser);
    app.get("/api/user", handleGetQuery);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
*/
    //var userDbModel = require('../model/user/user.model.server')();

    function handleGetQuery(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        console.log("hey-handleGet");

        if (password) {
            //findUserByCredentials(req, res);
        }
        else if (username) {
            //findUserByUsername(req, res);
        }
        else {
            res.status(404);
        }
    }
};