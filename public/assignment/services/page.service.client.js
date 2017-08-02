(function () {

    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService($http) {

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function deletePage(pageId) {
            var url = "/api/page/"+pageId;
            return $http.delete(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/"+pageId;
            return $http.put(url, page).then(function (res) {
                return res.data;
            });
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }

        function createPage(websiteId, page) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page).then(function (res) {
                return res.data;
            });
        }
    }
})();