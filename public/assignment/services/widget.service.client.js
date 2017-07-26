(function () {
    
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);
    
    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

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
            return (new Date()).getTime() + "";
        }
        
        function getWidgetTypes() {
            var widgetTypes = [
                "Heading",
                "Image",
                "Html",
                "Youtube"
            ];
            return widgetTypes;
        }
        
        function createWidget(pageId, widget) {
            var newWidget = widget;
            newWidget.pageId = pageId;
            newWidget._id = (new Date()).getTime() + "";
            widgets.push(newWidget);
        }

        function createWidgetWithGivenId(pageId, id, widget) {
            var newWidget = widget;
            newWidget.pageId = pageId;
            newWidget._id = id;
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            var foundWidgets = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    foundWidgets.push(widgets[w]);
                }
            }
            return foundWidgets;
        }
        
        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }
        
        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w] = widget;
                    return;
                }
            }
            return null;
        }
        
        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    return;
                }
            }
            return null;
        }
    }
    
})();