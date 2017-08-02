(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        userService
            .findUserById(userId)
            .then(setUser);

        function setUser(user) {
            model.user = user;
        }
        
        function updateUser(userId, user) {
            userService.updateUser(userId, user);
        }

        function unregisterUser(userId) {
            if (!userId) {
                model.errorMessage = "User not found";
                return;
            }
            userService.unregisterUser(userId);
        }
    }
})();