(function (){
    angular
        .module("GimenoProject")
        .controller("profileController", profileController);

    function profileController(userService, agentService, promoterService, venueService, $location, $route, $rootScope, $routeParams) {
        var model = this;

        model.access_token = $routeParams["access_token"];
        model.refresh_token = $routeParams["refresh_token"];

        model.userId = $routeParams["userId"];

        model.setUser = setUser;
        model.goToHomepage = goToHomepage;
        model.goToProfile = goToProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.removeArtistFromWatchlist = removeArtistFromWatchlist;
        model.removeArtistFromSpecialList = removeArtistFromSpecialList;


        userService
            .findUserById(model.userId)
            .then(setUser);

        console.log("get model user type");

        userService
            .findUserWatchlist(model.userId)
            .then(setWatchlist);

        function setSpecialList(list) {
            console.log("set special list");
            console.log(list);
            model.specialList = list;
        }

        function setWatchlist(list) {
            console.log(list);
            model.watchlist = list;
        }

        function removeArtistFromWatchlist(artistSpotifyId) {
            userService
                .removeArtistFromWatchlist(model.userId, artistSpotifyId)
                .then();
            $route.reload();
        }

        function setUser(user) {
            console.log("profile user set");
            console.log(user);
            model.user = user;
            findSpecialList();
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

        function goToHomepage() {
            $location.url("/homepage/" + model.userId +
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToProfile() {
            $location.url("/profile/"+model.userId+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function logout() {
            $location.url("/"+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
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