(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(registerService) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            var _user = userService.registerUser(user);
            if (!_user) {
                var user = userService.registerUser(user);
                $location.url("/profile" + user._id);
            }
        }
    }
})();