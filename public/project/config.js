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
            .when('/homepage', {
                templateUrl: "views/general/templates/homepage.view.client.html",
                controller: "homepageController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
            })
            .when('/register', {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model",
            })
            .when('/profile', {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when('/results', {
                templateUrl: "views/general/templates/results.view.client.html",
                controller: "resultsController",
                controllerAs: "model"
            })
            .when('/profile/artist/:artistSpotifyId', {
                templateUrl: "views/general/templates/artist.view.client.html",
                controller: "artistController",
                controllerAs: "model"
            })
            .when('/admin', {
                templateUrl: "views/user/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {currentUser: isAdmin}
            })
            .when('/profile/edit', {
                templateUrl: "views/user/templates/profile-edit.view.client.html",
                controller: "profileEditController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn}
            });

        function isAdmin(userService, $q, $location) {
            var deferred = $q.defer();

            userService
                .checkLoggedIn()
                .then(function (user) {
                    if (user === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else if (user.username === "admin") {
                        deferred.resolve(user);
                    } else {
                        deferred.reject();
                        $location.url('/');
                    }
                });

            return deferred.promise;
        }

        function checkLoggedIn(userService, $q, $location) {
            var deferred = $q.defer();

            userService
                .checkLoggedIn()
                .then(function (user) {
                    if (user === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }
    }
})();