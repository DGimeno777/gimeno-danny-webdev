(function () {

    angular
        .module("GimenoProject")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "getArtistSpotifyFollowers": getArtistSpotifyFollowers,
            "getArtistFacebookLikes": getArtistFacebookLikes,
            "getArtistGoogleTrendData": getArtistGoogleTrendData,
            "getUserByUsernameAndPassword": getUsernameByUsernameAndPassword
        };

        return api;

        function getUsernameByUsernameAndPassword(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url).then(function (user) {
                return user
            });
        }

        function searchArtist(artistName, accessToken) {
            var url = "https://api.spotify.com/v1/search?q="+artistName;
            /*for (var word in artistName.split(" ")) {
                if (word !== 0) {
                    url += "+";
                }
                url += artistName[word];
            }*/
            url += "&type=artist";
            return $http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(function (data) {
                return data;
            })
        }

        function getArtistSpotifyFollowers(artistName) {

        }

        function getArtistFacebookLikes(artistName) {

        }

        function getArtistGoogleTrendData(artistName) {

        }
    }

})();