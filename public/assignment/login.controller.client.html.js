(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        function init() {

        }
        init();

        model.login = function (user) {
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if (user === null) {
                model.errorMessage = "User not found";
            } else {
                $location.url("profile/"+user.id);
            }
        }
    }
})();