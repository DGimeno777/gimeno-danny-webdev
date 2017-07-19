var app = angular.module("WamApp", ["ngRoute"]);

app.controller("loginController", loginController);

app.config(configuration);

function configuration($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "view/login.html"
        })
        .when("/register", {
            templateUrl: "view/register.html"
        })
        .when("/profile/:userId", {
            templateUrl: "view/profile.html"
        })
}

function loginController($scope, $location) {
    //$scope.hello = "hello from angular controller";

    var users = [
        {id: "123", username : "danny"},
        {id: "234", username : "alice"}
    ];

    $scope.login = function (user) {
       $location.url("/register");
    }
}
