(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];


        var api = {
            "funcUserByUsernameAndPassword": findUserByUsernameAndPassword(username, password),
            "findUserById": findUserById(id),
            "registerUser": registerUser(user)
        };

        return api;

        function registerUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function findUserById(id) {
            for (var u in users) {
                var _user = users[u];
                if (_user.id === id) {
                    return _user;
                }
            }
        }

        function findUserByUsernameAndPassword(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
        }
    }
})();