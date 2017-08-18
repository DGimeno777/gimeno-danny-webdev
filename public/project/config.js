(function() {

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
            .when('/homepage/:userId', {
                templateUrl: "views/general/templates/homepage.view.client.html",
                controller: "homepageController",
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
            .when('/profile/:userId', {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when('/results', {
                templateUrl: "views/general/templates/results.view.client.html",
                controller: "resultsController",
                controllerAs: "model"
            })
            .when('/results/:userId', {
                templateUrl: "views/general/templates/results.view.client.html",
                controller: "resultsController",
                controllerAs: "model"
            })
            .when('/profile/artist/:artistSpotifyId', {
                templateUrl: "views/general/templates/artist.view.client.html",
                controller: "artistController",
                controllerAs: "model"
            })
            .when('/profile/artist/:artistSpotifyId/user/:userId', {
                templateUrl: "views/general/templates/artist.view.client.html",
                controller: "artistController",
                controllerAs: "model"
            })
    }
})();