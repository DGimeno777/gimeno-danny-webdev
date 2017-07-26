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
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "unregisterUser": unregisterUser,
            "updateUser": updateUser
        };

        return api;

        function unregisterUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        function registerUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                var currUser = users[u];
                if (currUser._id === userId) {
                    currUser = user;
                    return;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var currUser = users[u];
                if (currUser.username === username) {
                    return currUser;
                }
            }
            return null;
        }

        function findUserById(id) {
            for (var u in users) {
                var currUser = users[u];
                if (currUser._id === id) {
                    return currUser;
                }
            }
        }

        function findUserByUsernameAndPassword(username, password) {
            for (var u in users) {
                var currUser = users[u];
                if (currUser.username === username && currUser.password === password) {
                    return currUser;
                }
            }
            return null;
        }
    }
})();