(function (){
    angular
        .module("GimenoProject")
        .controller("homepageNoLoginController", homepageNoLoginController);

    function homepageNoLoginController(userService, $location, $rootScope, $routeParams) {
        var model = this;
        var access_token = $routeParams["access_token"];

        model.access_token = access_token;
        model.refresh_token = $routeParams["refresh_token"];
        console.log("Access Token: "+access_token);


        model.searchArtist = searchArtist;

        function searchArtist(artistName, accessToken, refreshToken) {
            $location.url("profile/"+user._id);
        }

    }
})();