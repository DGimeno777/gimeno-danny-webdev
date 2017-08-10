(function () {
    
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);
    
    function widgetNewController(widgetService, $routeParams, $location) {
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
            //model.newWidgetId = newWidgetId;
        }

        function createWidget(widgetId, widgetType) {
            console.log(widgetType);
            var newWidget = {
                //"_id": widgetId,
                "type": widgetType.toUpperCase(),
                "_page": model.pageId,
                "text": ""
            };
            widgetService
                .createWidget(model.pageId, newWidget)
                .then(function (widgetNew) {
                    console.log(widgetNew._id);
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+widgetNew._id+"/widget-editor");
                });
        }
    }
    
})();