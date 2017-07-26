(function () {
    
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);
    
    function websiteNewController(websiteService, $routeParams) {
        var model = this;
        
        model.makeWebsite = makeWebsite;
        model.userId = $routeParams["userId"];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();
        
        function makeWebsite(userId, website) {
            if (!website) {
                model.errorMessage = "Website not defined";
                return;
            }
            websiteService.createWebsite(userId, website);
            return;
        }
    }
    
})();
