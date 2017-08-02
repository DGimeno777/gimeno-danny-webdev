(function () {
    
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);
    
    function pageListController(pageService, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];

        pageService
            .findPagesByWebsiteId(model.websiteId)
            .then(setPages);

        function setPages(pages) {
            model.pages = pages;
        }

    }
    
})();