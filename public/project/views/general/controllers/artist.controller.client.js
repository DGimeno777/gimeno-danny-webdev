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
        model.addArtistToPromoterList = addArtistToPromoterList;
        model.addArtistToVenueList = addArtistToVenueList;
        model.addArtistToAgentList = addArtistToAgentList;
        model.addArtistToWatchlist = addArtistToWatchlist;
        /*model.agentListContainsArtist = agentListContainsArtist;
         model.artistOnWatchlist = artistOnWatchlist;
         model.watchlistContainsArtist = watchlistContainsArtist;
         */

        userService
            .checkLoggedIn()
            .then(function (user) {
                model.user = user;
                model.loggedIn = user != "0";
                if (model.loggedIn) {
                    model.userId = user._id;
                }
            }).then(function () {});

        if (agentListContainsArtist(model.artistSpotifyId)) {
            model.agentListContains = true;
        }
        if (watchlistContainsArtist(model.artistSpotifyId)) {
            model.watchListContains = true;
        }

        userService
            .searchArtistById(model.artistSpotifyId, model.access_token)
            .then(setResults);

        agentService
            .findArtistEntries(model.artistSpotifyId)
            .then(setAgentEntries);

        promoterService
            .findArtistEntries(model.artistSpotifyId)
            .then(setPromoterEntries);

        venueService
            .findArtistEntries(model.artistSpotifyId)
            .then(setVenueEntries);

        function setResults(result) {
            console.log("result");
            console.log(result);
            model.artist = result;
            console.log(model.artist);
        }

        function addArtistToPromoterList(artistSpotifyId, artistName, pictureUrl) {
            console.log("add");
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            promoterService
                .addArtistToPromoterList(model.userId, artistSpotifyId, model.addArtist)
                .then(function (stuff) {

                });
            //var url = "/results/"+model.userId;
            console.log("go");
            $route.reload();
        }

        function addArtistToVenueList(artistSpotifyId, artistName, pictureUrl) {
            console.log("add");
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            venueService
                .addArtistToVenueList(model.userId, artistSpotifyId, model.addArtist)
                .then(function (stuff) {

                });
            //var url = "/results/"+model.userId;
            console.log("go");
            $route.reload();
        }

        function addArtistToAgentList(artistSpotifyId, artistName, pictureUrl) {
            console.log("add");
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            agentService
                .addArtistToAgentList(model.userId, artistSpotifyId, model.addArtist)
                .then(function (stuff) {

                });
            //var url = "/results/"+model.userId;
            console.log("go");
            $route.reload();
        }

        function agentListContainsArtist(artistSpotifyId) {
            if (!model.watchlist) {
                console.log(model.watchlist);
                agentService
                    .findAgentArtistList(model.userId)
                    .then(setSpecialList);
            }
            for(var a in model.specialList) {
                if (model.specialList[a]._spotifyId === artistSpotifyId) {
                    return true;
                }
            }
            return false;
        }

        function setSpecialList(list) {
            model.specialList = list;
        }

        function artistOnWatchlist(artistId) {

            for (var a in model.user.artistWatchList) {
                if (model.user.artistWatchList[a] === artistId) {
                    return true;
                }
            }
            return false;
        }

        function watchlistContainsArtist(artistSpotifyId) {
            if (!model.watchlist) {
                console.log(model.watchlist);
                userService
                    .findUserWatchlist(model.userId)
                    .then(setWatchlist);
            }
            for(var a in model.watchlist) {
                if (model.watchlist[a]._spotifyId === artistSpotifyId) {
                    return true;
                }
            }
            return false;
        }

        function setWatchlist(list) {
            model.watchlist = list;
        }

        function addArtistToWatchlist(artistId, artistName, pictureUrl) {
            console.log("add");
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            userService
                .addArtistToWatchlist(model.userId, artistId, model.addArtist)
                .then(function (stuff) {

                });
            //var url = "/results/"+model.userId;
            console.log("go");
            $route.reload();
        }

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