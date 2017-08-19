(function (){
    angular
        .module("GimenoProject")
        .controller("loginController", loginController);

    function loginController(userService, $location, $rootScope, $routeParams) {
        var model = this;

        model.access_token = $routeParams["access_token"];
        model.refresh_token = $routeParams["refresh_token"];

        model.login = login;
        model.goToHomepage = goToHomepage;
        model.goToRegister = goToRegister;

        function login(user) {

            userService
                .login(user)
                .then(login);

            function login(user) {
                var user = user.data;
                $location.url("/"+
                    "?access_token="+model.access_token+
                    "&refresh_token="+model.refresh_token);
            }
        }

        function goToRegister() {
            $location.url("/register"+
                "?access_token="+access_token+
                "&refresh_token="+refresh_token);
        }

        function goToHomepage() {
            $location.url("/" +
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }
    }
})();