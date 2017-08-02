(function () {
    
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);
    
    function widgetService($http) {
        /*var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];*/

        var api = {
            "createWidget": createWidget,
            "createWidgetWithGivenId": createWidgetWithGivenId,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "generateNewWidgetId": generateNewWidgetId
        };

        return api;

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