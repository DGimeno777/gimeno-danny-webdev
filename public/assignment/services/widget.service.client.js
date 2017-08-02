(function () {
    
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);
    
    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "createWidgetWithGivenId": createWidgetWithGivenId,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "generateNewWidgetId": generateNewWidgetId,
            "updateWidgetPosition": updateWidgetPosition
        };

        return api;

        function updateWidgetPosition(pageId, startIndex, endIndex) {
            var url = "/api/page/"+pageId+"/widget?startIndex="+startIndex+"&endIndex="+endIndex;
            return $http.put(url);
        }

        function generateNewWidgetId() {
            var url = "/api/widget/newWidgetId";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }
        
        function getWidgetTypes() {
            var url = "/api/widget/widgetTypes";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }
        
        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget).then(function (res) {
                return res.data;
            });
        }

        function createWidgetWithGivenId(pageId, id, widget) {
            var newWidget = widget;
            newWidget._id = id;
            var url = "/api/page/"+pageId+"/widget/"+id;
            return $http.post(url, newWidget).then(function (res) {
                return res.data;
            });
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }
        
        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url).then(function (res) {
                return res.data;
            });
        }
        
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget).then(function (res) {
                return res.data;
            });
        }
        
        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url).then(function (res) {
                return res.data;
            });
        }
    }
    
})();