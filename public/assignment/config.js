// Declaring this inside of an anonymous function so that no one can see it
// and it is being evoked by the () at the end of the declaration
(function() {
    //app.controller("loginController", loginController);
    //app.controller("profileController", profileController);

    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            // Default route
            .when('/', {
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            // User Routes
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            // Website Routes
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            // Page Routings
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })
            // Widget Routings
            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/widget-editor", {
                templateUrl: "views/widget/widget-editor.view.client.html",
                controller: "widgetEditorController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/widget-heading", {
                templateUrl: "views/widget/widget-heading.view.client.html",
                controller: "widgetHeadingController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/widget-image", {
                templateUrl: "views/widget/widget-image.view.client.html",
                controller: "widgetImageController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/widget-youtube", {
                templateUrl: "views/widget/widget-youtube.view.client.html",
                controller: "widgetYoutubeController",
                controllerAs: "model"
            })
    }
})();