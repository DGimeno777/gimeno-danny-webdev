(function (){
    angular
        .module("GimenoProject")
        .controller("registerController", registerController);

    function registerController(userService, $location, $routeParams) {
        var model = this;

        model.accessToken = $routeParams["access_token"];
        model.refreshToken = $routeParams["refresh_token"];

        model.registerUser = registerUser;
        model.goToHomepage = goToHomepage;

        function registerUser(user) {

            userService
                .registerUser(user)
                .then(register, handleError);

            function handleError() {
                model.error = "User already exists";
            }

            function register(user) {
                $location.url("homepage/" + user._id +
                    "?access_token="+model.accessToken+
                    "&refresh_token="+model.refreshToken);
            }
        }

        function goToHomepage() {
            $location.url("/" +
                "?access_token="+model.accessToken+
                "&refresh_token="+model.refreshToken);
        }
    }
})();