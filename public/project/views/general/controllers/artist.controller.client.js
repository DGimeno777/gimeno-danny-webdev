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

        model.artistSpotifyId = $routeParams["artistSpotifyId"];

        model.goToLogin = goToLogin;
        model.goToRegister = goToRegister;
        model.goToProfile = goToProfile;
        model.goToHomepage = goToHomepage;
        model.logout = logout;

        userService
            .checkLoggedIn()
            .then(function (user) {
                model.user = user;
                model.loggedIn = user != "0";
                if (model.loggedIn) {
                    model.userId = user._id;
                }
            }).then(function () {});

        agentService
            .findArtistEntries(model.artistSpotifyId)
            .then(setAgentEntries);

        promoterService
            .findArtistEntries(model.artistSpotifyId)
            .then(setPromoterEntries);

        venueService
            .findArtistEntries(model.artistSpotifyId)
            .then(setVenueEntries);

        function setVenueEntries(list) {
            console.log("venue");
            console.log(list);
            model.venueEntries = list;
            for (var e in model.venueEntries) {
                var userAssoc = userService
                    .findUserById(userId)
                    .then(function (res) {
                        return res;
                    });
                model.venueEntries[e].userName = userAssoc.name;
                model.venueEntries[e].email = userAssoc.email;
            }
        }

        function setPromoterEntries(list) {
            console.log("promoter");
            console.log(list);
            model.promoterEntries = list;
            for (var e in model.promoterEntries) {
                var userAssoc = userService
                    .findUserById(userId)
                    .then(function (res) {
                        return res;
                    });
                model.promoterEntries[e].userName = userAssoc.name;
                model.promoterEntries[e].email = userAssoc.email;
            }
        }

        function setAgentEntries(list) {
            console.log("agent");
            console.log(list);
            model.agentEntries = list;
            for (var e in model.agentEntries) {
                var userAssoc = userService
                    .findUserById(model.agentEntries[e]._user)
                    .then(function (res) {
                        console.log("setAgententries");
                        console.log(res);
                        return res;
                    });
                model.agentEntries[e].userName = userAssoc.name;
                model.agentEntries[e].email = userAssoc.email;
            }
        }

        function logout() {
            userService
                .logout()
                .then(function (response) {
                    $location.url("/homepage"+
                        "?access_token="+model.access_token+
                        "&refresh_token="+model.refresh_token);
                });

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