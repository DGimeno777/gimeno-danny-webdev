(function (){
    angular
        .module("GimenoProject")
        .controller("profileController", profileController);

    function profileController(userService, agentService, promoterService, venueService, $location, $route, $rootScope, $routeParams) {
        var model = this;

        model.access_token = $routeParams["access_token"];
        model.refresh_token = $routeParams["refresh_token"];

        model.goToHomepage = goToHomepage;
        model.goToProfile = goToProfile;
        model.goToArtistPage = goToArtistPage;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.removeArtistFromWatchlist = removeArtistFromWatchlist;
        model.removeArtistFromSpecialList = removeArtistFromSpecialList;
        model.goToProfileEdit = goToProfileEdit;
        model.goToAdmin = goToAdmin;

        userService.checkLoggedIn()
            .then(function (user) {
                console.log("check login");
                console.log(user);
                model.user = user;
                model.loggedIn = user != "0";
                if (model.loggedIn) {
                    model.userId = user._id;
                    findSpecialList();
                    userService
                        .findUserWatchlist(model.userId)
                        .then(setWatchlist);
                }
            }).then(function () {
        });

        console.log("get model user type");

        function setSpecialList(list) {
            console.log("set special list");
            console.log(list);
            model.specialList = list;
        }

        function setWatchlist(list) {
            console.log(list);
            model.watchlist = list;
        }

        function goToArtistPage(artistSpotifyId) {
            var url = "/profile/artist/"+artistSpotifyId;
            $location.url(url+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function removeArtistFromWatchlist(artistSpotifyId) {
            userService
                .removeArtistFromWatchlist(model.userId, artistSpotifyId)
                .then();
            $route.reload();
        }

        function removeArtistFromSpecialList(artistSpotifyId) {
            var userType = model.user.type;
            if (userType !== "Researcher") {
                if (userType === "Promoter") {
                    promoterService
                        .removeArtistFromPromoterList(model.userId, artistSpotifyId)
                        .then();
                }
                else if (userType === "Venue") {
                    venueService
                        .removeArtistFromVenueList(model.userId, artistSpotifyId)
                        .then();
                }
                else if (userType === "Agent") {
                    agentService
                        .removeArtistFromAgentList(model.userId, artistSpotifyId)
                        .then();
                }
                $route.reload();
            }
        }

        function findSpecialList() {
            console.log("find special list");
            var userType = model.user.type;
            if (userType !== "Researcher") {
                if (userType === "Promoter") {
                    promoterService
                        .findPromoterArtistList(model.userId)
                        .then(setSpecialList);
                }
                else if (userType === "Venue") {
                    venueService
                        .findVenueArtistList(model.userId)
                        .then(setSpecialList);
                }
                else if (userType === "Agent") {
                    agentService
                        .findAgentArtistList(model.userId)
                        .then(setSpecialList);
                }
            }
        }

        function goToAdmin() {
            $location.url("/admin"+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToProfileEdit() {
            $location.url("/profile/edit"+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
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

        function unregisterUser() {
            userService
                .unregisterUser(model.userId)
                .then(function (hello) {

                });

            $location.url("/" +
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }
    }
})();