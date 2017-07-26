(function () {

    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController(pageService, $routeParams) {
        var model = this;
        
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        
        model.createPage = createPage;
 
        function init() {

        }
        init();
        
        function createPage(websiteId, page) {
            pageService.createPage(websiteId, page);
        }
    }
})();