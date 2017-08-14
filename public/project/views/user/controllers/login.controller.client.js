(function (){
    angular
        .module("GimenoProject")
        .controller("loginController", loginController);

    function loginController($location, $rootScope, userService) {
        var model = this;

        model.login = login;
    }

    function login(user) {

        userService
            .findUserByUsernameAndPassword(user.username, user.password)
            .then(login, handleError);

        function handleError() {
            model.errorMessage = "User not defined";
        }

        function login(user) {
            $rootScope.currentUser = user;
            $location.url("profile/"+user._id);
        }
    }

})();