(function () {

    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService)

    function websiteService($http) {

        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }

        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;

            return $http.delete(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+websiteId;

            return $http.put(url, website).then(function (res) {
                return res.data;
            });
        }

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }
    }
})();