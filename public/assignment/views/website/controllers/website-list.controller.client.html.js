(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);
    
    function websiteListController($routeParams, websiteService) {
        var model = this;
        var userId = $routeParams["userId"];
        model.userId = userId;

        websiteService
            .findWebsitesByUser(userId)
            .then(setWebsites);

        function setWebsites(websites) {
            model.websites = websites;
        }
    }
})();