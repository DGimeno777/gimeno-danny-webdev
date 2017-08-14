(function (){
    angular
        .module("GimenoProject")
        .controller("resultsController", resultsController);

    function resultsController(userService, $location, $rootScope, $routeParams) {
        var model = this;
        var access_token = $routeParams["access_token"];
        var artistName = $routeParams["artist_name"];
        model.access_token = access_token;
        console.log("Access Token: "+access_token);

        userService
            .searchArtist(artistName, access_token)
            .then(setResults);

        function setResults(results) {
            console.log(results);
            model.results = results;
        }
    }
})();