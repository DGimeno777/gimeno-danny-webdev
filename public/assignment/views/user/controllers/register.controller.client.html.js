(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {

            userService
                .registerUser(user)
                .then(register, handleError);

            function handleError() {
                model.error = "User already exists";
            }

            function register(user) {
                $location.url("profile/" + user._id);
            }
        }
    }
})();