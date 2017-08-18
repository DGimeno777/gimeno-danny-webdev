(function () {

    angular
        .module("GimenoProject")
        .factory("promoterService", promoterService);

    function promoterService($http) {

        var api = {
            "findPromoterArtistList": findPromoterArtistList,
            "removeArtistFromPromoterList": removeArtistFromPromoterList,
            "updatePromoterArtist": updatePromoterArtist,
            "addArtistToPromoterList": addArtistToPromoterList,
            "findArtistEntries": findArtistEntries,
            "getAllEntries": getAllEntries
        };

        return api;

        function getAllEntries() {
            console.log("user.service.client-all")
            return $http.get('/api/promoter/all').then(function (res) {
                return res.data;
            })
        }

        function findArtistEntries(artistSpotifyId) {
            var url = "/api/promoter/artist/"+artistSpotifyId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function updatePromoterArtist(userId, artistSpotifyId, artist) {
            var url = "/api/promoter/"+userId+"/promoterlist/update/"+artistSpotifyId;
            return $http.put(url, artist).then(function (res) {
                return res.data;
            })
        }

        function removeArtistFromPromoterList(userId, artistSpotifyId) {
            var url = "/api/promoter/"+userId+"/promoterlist/delete/"+artistSpotifyId;
            return $http.delete(url).then(function (res) {
                return res.data;
            })
        }

        function findPromoterArtistList(userId) {
            console.log("user.service.client-list");
            console.log(userId);
            var url = "/api/promoter/"+userId+"/promoterlist";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function addArtistToPromoterList(userId, artistSpotifyId, artist) {
            console.log("user.service.client");
            var url = "/api/promoter/"+userId+"/promoterlist/add/"+artistSpotifyId;
            return $http.post(url, artist).then(function (res) {
                return res.data;
            });
        }
    }

})();