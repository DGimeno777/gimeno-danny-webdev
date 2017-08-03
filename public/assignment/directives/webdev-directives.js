(function () {
    angular
        .module("WebAppMaker")
        .directive("widgetList", widgetList);

    function widgetList($http) {

        function linkFunction(scope, element, attrs) {

            var startIndex = -1;
            var endIndex = -1;

            element.sortable({
                axis: 'y',
                handle: ".sortable-handle",
                tolerance: 'touch',
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    $http.put("/api/page/"+scope.model.pageId+"/widget?initial="+startIndex+"&final="+endIndex);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();