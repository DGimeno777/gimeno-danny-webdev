// Declaring this inside of an anonymous function so that no one can see it
// and it is being evoked by the () at the end of the declaration
(function() {
    //app.controller("loginController", loginController);
    //app.controller("profileController", profileController);

    app.config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateUrl: "view/user/profile.view.client.html"
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html"
            })
            .when("/widget-heading", {
                templateUrl: "views/widget/widget-heading.view.client.html"
            })
            .when("/widget-image", {
                templateUrl: "views/widget/widget-image.view.client.html"
            })
            .when("/widget-youtube", {
                templateUrl: "views/widget/widget-youtube.view.client.html"
            })
    }
})();