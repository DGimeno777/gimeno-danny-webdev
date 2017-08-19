(function () {
    angular
        .module("GimenoProject")
        .controller("profileEditController", profileEditController);

    function profileEditController(userService, $location, $route, $rootScope, $routeParams) {
        var model = this;

        model.access_token = $routeParams["access_token"];
        model.refresh_token = $routeParams["refresh_token"];

        model.goToHomepage = goToHomepage;
        model.goToProfile = goToProfile;
        model.logout = logout;
        model.updateUser = updateUser;

        userService.checkLoggedIn()
            .then(function (user) {
                console.log("check login - artist prof");
                console.log(user);
                model.user = user;
                model.loggedIn = user != "0";
                if (model.loggedIn) {
                    model.userId = user._id;
                }
            }).then(function () {
        });
        
        function updateUser(userId, user) {
            userService.updateUser(userId, user);
            $route.reload();
        }

        function goToHomepage() {
            $location.url("/homepage"+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToProfile() {
            $location.url("/profile"+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function logout() {
            userService
                .logout()
                .then(function (response) {
                    $location.url("/"+
                        "?access_token="+model.access_token+
                        "&refresh_token="+model.refresh_token);
                });
        }
    }
})();