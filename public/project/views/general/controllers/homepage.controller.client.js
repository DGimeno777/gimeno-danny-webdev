(function (){
    angular
        .module("GimenoProject")
        .controller("homepageController", homepageController);

    function homepageController(userService, $location, $route, $routeParams) {
        var model = this;
        var access_token = $routeParams["access_token"];
        var refresh_token = $routeParams["refresh_token"];

        model.access_token = access_token;
        model.refresh_token = refresh_token;

        model.searchArtist = searchArtist;
        model.goToLogin = goToLogin;
        model.goToRegister = goToRegister;
        model.goToProfile = goToProfile;
        model.goToHomepage = goToHomepage;
        model.logout = logout;

        userService.checkLoggedIn()
            .then(function (user) {
                console.log("check login");
                console.log(user);
                model.user = user;
                model.loggedIn = user != "0";
                if (model.loggedIn) {
                    model.userId = user._id;
                }
            }).then(function () {

        });

        function logout() {
            userService
                .logout()
                .then(function (response) {
                    $route.reload();
                });
        }

        function searchArtist(artistName) {
            var url = "/results";
            $location.url(url+"?artist_name="+artistName+
                "&access_token="+access_token+
                "&refresh_token="+refresh_token);
        }

        function goToHomepage() {
            $location.url("/" +
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);

        }

        function goToProfile() {
            $location.url("/profile"+
                "?access_token="+access_token+
                "&refresh_token="+refresh_token);
        }

        function goToLogin() {
            $location.url("/login"+
                "?access_token="+access_token+
                "&refresh_token="+refresh_token);
        }

        function goToRegister() {
            $location.url("/register"+
                "?access_token="+access_token+
                "&refresh_token="+refresh_token);
        }
    }
})();