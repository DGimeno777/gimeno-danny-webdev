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

        websiteService
            .findWebsitesByUser(model.userId)
            .then(setWebsites);

        websiteService
            .findWebsiteById(model.websiteId)
            .then(setWebsite);

        function setWebsite(website) {
            model.website = website;
        }

        function setWebsites(websites) {
            model.websites = websites;
        }

        function updateWebsite(websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
        }
    }
})();