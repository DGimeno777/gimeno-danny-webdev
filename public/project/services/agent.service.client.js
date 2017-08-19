(function () {

    angular
        .module("GimenoProject")
        .factory("agentService", agentService);

    function agentService($http) {

        var api = {
            "findAgentArtistList": findAgentArtistList,
            "removeArtistFromAgentList": removeArtistFromAgentList,
            "updateAgentArtist": updateAgentArtist,
            "addArtistToAgentList": addArtistToAgentList,
            "findArtistEntries": findArtistEntries,
            "getAllEntries": getAllEntries
        };

        return api;

        function getAllEntries() {
            return $http.get('/api/agent/all').then(function (res) {
                return res.data;
            })
        }
        
        function findArtistEntries(artistSpotifyId) {
            var url = "/api/agent/artist/"+artistSpotifyId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function updateAgentArtist(userId, artistSpotifyId, artist) {
            var url = "/api/agent/"+userId+"/agentlist/update/"+artistSpotifyId;
            return $http.put(url, artist).then(function (res) {
                return res.data;
            })
        }

        function removeArtistFromAgentList(userId, artistSpotifyId) {
            var url = "/api/agent/"+userId+"/agentlist/delete/"+artistSpotifyId;
            return $http.delete(url).then(function (res) {
                return res.data;
            })
        }

        function findAgentArtistList(userId) {
            var url = "/api/agent/"+userId+"/agentlist";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function addArtistToAgentList(userId, artistSpotifyId, artist) {
            var url = "/api/agent/"+userId+"/agentlist/add/"+artistSpotifyId;
            return $http.post(url, artist).then(function (res) {
                return res.data;
            });
        }
    }

})();