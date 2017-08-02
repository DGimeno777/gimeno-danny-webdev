(function () {

    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService)

    function websiteService($http) {

        /*var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];*/

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
            /*for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                }
            }*/
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+websiteId;

            return $http.put(url, website).then(function (res) {
                return res.data;
            });
            /*for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w] = website;
                    return;
                }
            }
            return null;*/
        }

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);/*.then(function (res) {
                return res.data;
            });/*
            /*var newWebsite = website;
            newWebsite._id = new Date().getTime();
            newWebsite.developerId = userId;
            websites.push(newWebsite);*/
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url).then(function (res) {
                return res.data;
            });
            /*var foundWebsites = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    foundWebsites.push(websites[w]);
                }
            }
            console.log("Length: " + foundWebsites.length);
            return foundWebsites;*/
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
            /*for (var w in websites) {
                var currWebsite = websites[w];
                if (currWebsite._id === websiteId) {
                    return currWebsite;
                }
            }
            return null;*/
        }
    }
})();