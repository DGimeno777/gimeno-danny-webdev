(function () {
    angular
        .module("WebdevDirectives", [])
        .directive("itemList", itemListDirective);

    console.log("this runs");

    function itemListDirective($http) {

        function linkFunction(scope, element) {
            var widgets = element.find("#djg-widget-ul");

            console.log(element);

            var startIndex = -1;
            var endIndex = -1;

            widgets.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                    console.log("start");
                },

                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log("stop");
                    //$http.put("/api/widget?startIndex="+startIndex+"&stopIndex="+endIndex);
                }
            });
        }

        return {
            templateUrl: "views/widget/widget-list.view.client.html",
            link: linkFunction
        }
    }
})();