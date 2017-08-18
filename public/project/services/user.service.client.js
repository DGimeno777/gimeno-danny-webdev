(function () {

    angular
        .module("GimenoProject")
        .factory("userService", userService);

    function userService($http) {

        var apiUrl = "/api/user";

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "unregisterUser": unregisterUser,
            "updateUser": updateUser,
            "searchArtist": searchArtist,
            "addArtistToWatchlist": addArtistToWatchlist,
            "findUserWatchlist": findUserWatchlist,
            "removeArtistFromWatchlist": removeArtistFromWatchlist,
            "login": login,
            "logout": logout,
            "register": register,
            "checkLoggedIn": checkLoggedIn,
            "searchArtistById": searchArtistById
        };

        return api;

        function checkLoggedIn() {
            console.log("user.service.client-checklogin");
            return $http.get('/api/loggedin').then(function (res) {
                return res.data;
            });
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function removeArtistFromWatchlist(userId, artistSpotifyId) {
            var url = apiUrl+"/"+userId+"/watchlist/delete/"+artistSpotifyId;
            return $http.delete(url).then(function (res) {
                return res.data;
            })
        }

        function findUserWatchlist(userId) {
            var url = apiUrl+"/"+userId+"/watchlist";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function addArtistToWatchlist(userId, artistSpotifyId, artist) {
            console.log("user.service.client");
            var url = apiUrl+"/"+userId+"/watchlist/add/"+artistSpotifyId;
            return $http.post(url, artist).then(function (res) {
                return res.data;
            });
        }

        function searchArtist(artistName, accessToken) {
            var url = "https://api.spotify.com/v1/search?q="+artistName+"&type=artist";
            return $http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(function (result) {
                return result.data;
            })
        }

        function searchArtistById(artistId, accessToken) {
            var url = "https://api.spotify.com/v1/artists/"+artistId;
            return $http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(function (result) {
                return result.data;
            })
        }

        function registerUser(user) {
            var url = apiUrl;
            console.log("user.service.client");
            return $http.post(url, user).then(function (res) {
                return res.data;
            });
        }

        function unregisterUser(userId) {
            var url = apiUrl+"/"+userId;
            return $http.delete(url).then(function (res) {
                return res.data;
            });
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