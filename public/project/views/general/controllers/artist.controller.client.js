(function (){
    angular
        .module("GimenoProject")
        .controller("artistController", artistController);

    function artistController(userService, agentService, promoterService, venueService, $location, $routeParams) {
        var model = this;
        var access_token = $routeParams["access_token"];
        var refresh_token = $routeParams["refresh_token"];

        model.access_token = access_token;
        model.refresh_token = refresh_token;

        model.userId = $routeParams["userId"];
        model.artistSpotifyId = $routeParams["artistSpotifyId"];

        model.goToLogin = goToLogin;
        model.goToRegister = goToRegister;
        model.goToProfile = goToProfile;
        model.goToHomepage = goToHomepage;
        model.logout = logout;

        if (model.userId) {
            userService
                .findUserById(model.userId)
                .then(setUser);
        }

        agentService
            .findArtistEntries(model.artistSpotifyId)
            .then(setAgentEntries);

        function setAgentEntries(list) {
            console.log("agent entries");
            console.log(list)
            model.agentEntries = list;
        }

        function logout() {
            $location.url("/"+
                "?access_token="+access_token+
                "&refresh_token="+refresh_token);
        }

        function goToHomepage() {
            var url = "/";
            if (model.userId) {
                url += "homepage/" + model.userId;
            }
            console.log(url);
            $location.url(url +
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);

        }

        function goToProfile() {
            $location.url("/profile/"+model.userId+
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