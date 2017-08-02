(function () {
    
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);
    
    function websiteNewController(websiteService, $routeParams) {
        var model = this;
        
        model.makeWebsite = makeWebsite;
        model.userId = $routeParams["userId"];

        websiteService
            .findWebsitesByUser(model.userId)
            .then(setWebsites);

        function setWebsites(websites) {
            model.websites = websites;
        }
        
        function makeWebsite(userId, website) {
            if (!website) {
                model.errorMessage = "Website not defined";
                return;
            }
            websiteService.createWebsite(userId, website);
        }
    }
    
})();
