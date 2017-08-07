(function() {
    //app.controller("loginController", loginController);
    //app.controller("profileController", profileController);

    angular
        .module("GimenoProject")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
        // Default route
            .when('/', {
                templateUrl: "views/general/templates/homepage.view.client.html",
                controller: "homepageController",
                controllerAs: "model"
            })
    }
})();