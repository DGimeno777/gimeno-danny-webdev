(function () {

    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    return;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                var currPage = pages[p];
                if (currPage._id === pageId) {
                    pages[p] = page;
                    return;
                }
            }
            return null;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                var currPage = pages[p];
                if (currPage._id === pageId) {
                    return currPage;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var foundPages = [];
            for (var p in pages) {
                var currPage = pages[p];
                if (currPage.websiteId === websiteId) {
                    foundPages.push(currPage);
                }
            }
            return foundPages;
        }

        function createPage(websiteId, page) {
            var newPage = page;
            newPage._id = (new Date()).getTime()+"";
            newPage.websiteId = websiteId;
            pages.push(newPage);
        }
    }
})();