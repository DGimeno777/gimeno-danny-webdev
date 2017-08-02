(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetEditorController", widgetEditorController);

    function widgetEditorController(widgetService, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgetId = $routeParams["widgetId"];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getWidgetEditorUrl = getWidgetEditorUrl;

        widgetService
            .findWidgetById(model.widgetId)
            .then(setWidget);

        function setWidget(widget) {
            model.widget = widget;
        }

        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget);
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
        }

        function getWidgetEditorUrl(widgetType) {
            return "views/widget/widget-edit/widget-" + widgetType.toLowerCase() + "-editor.view.client.html";
        }
    }

})();