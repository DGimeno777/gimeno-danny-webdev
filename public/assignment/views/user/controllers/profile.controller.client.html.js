(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();
        
        function updateUser(userId, user) {
            userService.updateUser(userId, user);
        }
        
        function unregister() {
        }
    }
})();