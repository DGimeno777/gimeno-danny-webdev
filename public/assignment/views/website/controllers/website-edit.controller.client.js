(function () {

    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController(websiteService, $routeParams) {
        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function updateWebsite(websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
        }
    }
})();