(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController(widgetService, $routeParams, $sce) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];

        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.trustUrlResource = trustUrlResource;
        model.trustHtmlContent = trustHtmlContent;

        widgetService
            .findWidgetsByPageId(model.pageId)
            .then(setWidgets);

        function setWidgets(widgets) {
            model.widgets = widgets;
        }

        function getWidgetIncludeUrl(widgetType) {
            return "views/widget/widgetTypes/widget-" + widgetType + ".view.client.html";
        }

        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }
    }

})();