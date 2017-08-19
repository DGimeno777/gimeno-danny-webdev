(function (){
    angular
        .module("GimenoProject")
        .controller("adminController", adminController);

    function adminController(userService, agentService, promoterService, venueService, $rootScope, $route, $location, $routeParams) {
        var model = this;

        model.accessToken = $routeParams["access_token"];
        model.refreshToken = $routeParams["refresh_token"];

        model.registerUser = registerUser;
        model.goToHomepage = goToHomepage;
        // User
        model.updateUserEntry = updateUserEntry;
        model.deleteUserEntry = deleteUserEntry;
        model.createUserEntry = createUserEntry;
        // Artist
        //model.deleteArtistEntry = deleteArtistEntry;
        // Promoter
        //model.updatePromoterEntry = updatePromoterEntry;
        //model.deletePromoterEntry = deletePromoterEntry;
        // Venue
        //model.updateVenueEntry = updateVenueEntry;
        //model.deleteVenueEntry = deleteVenueEntry;
        // Agent
        //model.updateAgentEntry = updateAgentEntry;
        //model.deleteAgentEntry = model.deleteAgentEntry;

        userService
            .getAllEntries()
            .then(function (userEntries) {
                console.log("user entries");
                console.log(userEntries);
                model.userEntries = userEntries;
            });

        userService
            .getAllArtistEntries()
            .then(function (entries) {
                model.artistEntries = entries;
            });

        venueService
            .getAllEntries()
            .then(function (entries) {
                model.venueEntries = entries;
            })

        promoterService
            .getAllEntries()
            .then(function (entries) {
                model.promoterEntries = entries;
            })

        agentService
            .getAllEntries()
            .then(function (entries) {
                model.agentEntries = entries;
            });


        function updateUserEntry(entryId, entry) {
            userService
                .updateUser(entryId, entry)
                .then(function (back) {
                    $route.reload();
                });
            $route.reload();
        }

        function deleteUserEntry(entryId) {
            userService
                .unregisterUser(entryId)
                .then(function (back) {

                });
            $route.reload();
        }

        function createUserEntry(entry) {
            console.log("entry");
            console.log(entry);
            userService
                .registerUser(entry)
                .then(function (back) {

                });
            $route.reload();
        }


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