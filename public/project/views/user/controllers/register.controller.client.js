(function (){
    angular
        .module("GimenoProject")
        .controller("registerController", registerController);

    function registerController(userService, $rootScope, $location, $routeParams) {
        var model = this;

        model.accessToken = $routeParams["access_token"];
        model.refreshToken = $routeParams["refresh_token"];

        model.registerUser = registerUser;
        model.goToHomepage = goToHomepage;

        function registerUser(user) {
            userService
                .register(user)
                .then(
                    function(response) {
                        console.log("reg response");
                        console.log(response);
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/homepage"+
                            "?access_token="+model.accessToken+
                            "&refresh_token="+model.refreshToken);
                    });
        }

        function goToHomepage() {
            $location.url("/" +
                "?access_token="+model.accessToken+
                "&refresh_token="+model.refreshToken);
        }
    }
})();