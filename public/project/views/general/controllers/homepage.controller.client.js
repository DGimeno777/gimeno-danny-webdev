(function (){
    angular
        .module("GimenoProject")
        .controller("homepageController", homepageController);

    function homepageController($location, $routeParams) {
        var model = this;
        var access_token = $routeParams["access_token"];
        var refresh_token = $routeParams["refresh_token"];

        model.access_token = access_token;
        model.refresh_token = refresh_token;

        model.userId = $routeParams["userId"];

        model.searchArtist = searchArtist;
        model.goToLogin = goToLogin;
        model.goToRegister = goToRegister;
        model.goToProfile = goToProfile;
        model.goToHomepage = goToHomepage;
        model.logout = logout;

        function logout() {
            $location.url("/"+
                "?access_token="+access_token+
                "&refresh_token="+refresh_token);
        }

        function searchArtist(artistName) {
            var url = "/results";
            if (model.userId) {
                url += "/"+model.userId;
            }
            $location.url(url+"?artist_name="+artistName+
                "&access_token="+access_token+
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