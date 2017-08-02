(function () {

    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {

        var apiUrl = "/api/user";

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "unregisterUser": unregisterUser,
            "updateUser": updateUser
        };

        return api;


        function registerUser(user) {
            var url = apiUrl;
            return $http.post(url, user).then(function (res) {
                return res.data;
            });
        }

        function unregisterUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        function updateUser(userId, user) {
            var url = apiUrl+"/"+userId;
            return $http(url, user);
        }

        function findUserByUsername(username) {
            var url = apiUrl+"?username="+username;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function findUserById(id) {
            return $http.get(apiUrl+"/"+id).then(function (res) {
                return res.data;
            });
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = apiUrl+"?username="+username+"&password="+password;
            return ($http.get(url).then(function (res) {
                return res.data;
            }));
        }
    }
})();