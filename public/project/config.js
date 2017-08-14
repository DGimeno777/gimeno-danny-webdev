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
                controller: "homepageNoLoginController",
                controllerAs: "model"
            })
            .when('/homepage/:uid', {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "homepageLoginController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when('/register', {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when('/results', {
                templateUrl: "views/general/templates/results.view.client.html",
                controller: "resultsController",
                controllerAs: "model"
            })
    }
})();