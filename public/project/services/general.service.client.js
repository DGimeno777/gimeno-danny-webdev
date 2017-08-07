(function () {

    angular
        .module("GimenoProject")
        .factory("generalService", generalService);

    function generalService($http) {

        var api = {
            "getArtistSpotifyFollowers": getArtistSpotifyFollowers,
            "getArtistFacebookLikes": getArtistFacebookLikes,
            "getArtistGoogleTrendData": getArtistGoogleTrendData
        };

        return api;

        function getArtistSpotifyFollowers(artistName) {

        }

        function getArtistFacebookLikes(artistName) {

        }

        function getArtistGoogleTrendData(artistName) {

        }
    }

})();