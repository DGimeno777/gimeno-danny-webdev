(function () {
    
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);
    
    function widgetNewController(widgetService, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];

        model.createWidget = createWidget;

        widgetService
            .getWidgetTypes()
            .then(setWidgetTypes);

        widgetService
            .generateNewWidgetId()
            .then(setNewWidgetId);

        function setWidgetTypes(widgetTypes) {
            model.widgetTypes = widgetTypes;
        }

        function setNewWidgetId(newWidgetId) {
            model.newWidgetId = newWidgetId;
        }

        function createWidget(widgetId, widgetType) {
            console.log(widgetId);
            var newWidget = {
                "_id": widgetId,
                "widgetType": widgetType.toUpperCase(),
                "pageId": model.pageId,
                "text": ""
            };
            console.log(newWidget.pageId);
            widgetService.createWidgetWithGivenId(model.pageId, newWidget._id, newWidget);
        }
    }
    
})();