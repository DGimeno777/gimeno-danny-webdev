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
            "findArtistEntries": findArtistEntries
        };

        return api;
        
        function findArtistEntries(artistSpotifyId) {
            console.log("agent.service.client-entries");
            var url = "/api/agent/artist/"+artistSpotifyId;
            return $http.get(url).then(function (res) {
                return res.data;
            })
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
            console.log("user.service.client");
            var url = "/api/agent/"+userId+"/agentlist/add/"+artistSpotifyId;
            return $http.post(url, artist).then(function (res) {
                return res.data;
            });
        }
    }

})();