(function () {

    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController(pageService, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        pageService
            .findPageById(model.pageId)
            .then(setPage);

        function setPage(page) {
            model.page = page;
        }

        function updatePage(pageId, page) {
            pageService.updatePage(pageId, page);
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
        }
    }

})();