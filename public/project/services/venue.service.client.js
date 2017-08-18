(function () {

    angular
        .module("GimenoProject")
        .factory("venueService", venueService);

    function venueService($http) {

        var api = {
            "findVenueArtistList": findVenueArtistList,
            "removeArtistFromVenueList": removeArtistFromVenueList,
            "updateVenueArtist": updateVenueArtist,
            "addArtistToVenueList": addArtistToVenueList,
            "findArtistEntries": findArtistEntries
        };

        return api;

        function findArtistEntries(artistSpotifyId) {
            var url = "/api/venue/artist/"+artistSpotifyId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function updateVenueArtist(userId, artistSpotifyId, artist) {
            var url = "/api/venue/"+userId+"/venuelist/update/"+artistSpotifyId;
            return $http.put(url, artist).then(function (res) {
                return res.data;
            })
        }

        function removeArtistFromVenueList(userId, artistSpotifyId) {
            var url = "/api/venue/"+userId+"/venuelist/delete/"+artistSpotifyId;
            return $http.delete(url).then(function (res) {
                return res.data;
            })
        }

        function findVenueArtistList(userId) {
            var url = "/api/venue/"+userId+"/venuelist";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function addArtistToVenueList(userId, artistSpotifyId, artist) {
            console.log("user.service.client");
            var url = "/api/venue/"+userId+"/venuelist/add/"+artistSpotifyId;
            return $http.post(url, artist).then(function (res) {
                return res.data;
            });
        }
    }

})();