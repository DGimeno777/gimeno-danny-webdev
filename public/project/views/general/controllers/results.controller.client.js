(function (){
    angular
        .module("GimenoProject")
        .controller("resultsController", resultsController);

    function resultsController(userService, agentService, venueService, promoterService, $route, $location, $rootScope, $routeParams) {
        var model = this;
        var accessToken = $routeParams["access_token"];
        var artistName = $routeParams["artist_name"];
        model.access_token = accessToken;
        model.refresh_token = $routeParams["refresh_token"];

        model.checkImageGiven = checkImageGiven;
        model.goToProfile = goToProfile;
        model.goToLogin = goToLogin;
        model.goToRegister = goToRegister;
        model.goToArtistPage = goToArtistPage;
        model.goToHomepage = goToHomepage;
        model.artistOnWatchlist = artistOnWatchlist;
        model.addArtistToWatchlist = addArtistToWatchlist;
        model.watchlistContainsArtist = watchlistContainsArtist;
        model.logout = logout;
        model.agentListContainsArtist = agentListContainsArtist;
        model.addArtistToAgentList = addArtistToAgentList;
        model.addArtistToVenueList = addArtistToVenueList;
        model.addArtistToPromoterList = addArtistToPromoterList;
        model.searchArtist = searchArtist;

        userService.checkLoggedIn()
            .then(function (user) {
                model.user = user;
                model.loggedIn = user != "0";
                if (model.loggedIn) {
                    model.userId = user._id;
                }
            }).then(function () {
        });

        userService
            .searchArtist(artistName, accessToken)
            .then(setResults);

        function setWatchlist(list) {
            model.watchlist = list;
        }

        function setResults(results) {
            model.results = results.artists.items;
        }

        function setSpecialList(list) {
            model.specialList = list;
        }

        function addArtistToPromoterList(artistSpotifyId, artistName, pictureUrl) {
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            promoterService
                .addArtistToPromoterList(model.userId, artistSpotifyId, model.addArtist)
                .then(function (stuff) {

                });
            $route.reload();
        }

        function addArtistToVenueList(artistSpotifyId, artistName, pictureUrl) {
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            venueService
                .addArtistToVenueList(model.userId, artistSpotifyId, model.addArtist)
                .then(function (stuff) {

                });
            $route.reload();
        }

        function addArtistToAgentList(artistSpotifyId, artistName, pictureUrl) {
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            agentService
                .addArtistToAgentList(model.userId, artistSpotifyId, model.addArtist)
                .then(function (stuff) {

                });
            $route.reload();
        }

        function agentListContainsArtist(artistSpotifyId) {
            if (!model.watchlist) {
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

        function addArtistToWatchlist(artistId, artistName, pictureUrl) {
            model.addArtist = {};
            model.addArtist.name = artistName;
            model.addArtist.pictureUrl = checkImageGiven(pictureUrl);
            userService
                .addArtistToWatchlist(model.userId, artistId, model.addArtist)
                .then(function (stuff) {

                });
            $route.reload();
        }

        function checkImageGiven(imageSource) {

            if (!imageSource) {
                return "../../../images/project/profile_default.png";
            }

            return imageSource;
        }

        function searchArtist(artistName) {
            var url = "/results";
            $location.url(url+"?artist_name="+artistName+
                "&access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToArtistPage(artistSpotifyId) {
            var url = "/profile/artist/"+artistSpotifyId;
            $location.url(url+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToHomepage() {
            $location.url("/" +
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToProfile() {
            $location.url("/profile"+
                "?artist_name="+artistName+
                "&access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToLogin() {
            $location.url("/login"+
                "?access_token="+model.access_token+
                "&refresh_token="+model.refresh_token);
        }

        function goToRegister() {
            $location.url("/register"+
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