module.exports = (function () {
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server');
    var widgetModel = mongoose.model('widgetModel', widgetSchema);
    var pageModel = require("../page/page.model.server");

    // Req
    widgetModel.createWidget = createWidget;
    widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.updateWidget = updateWidget;
    widgetModel.deleteWidget = deleteWidget;
    widgetModel.reorderWidget = reorderWidget;

    // Custom
    widgetModel.deletePageWidgets = deletePageWidgets;

    return widgetModel;

    function deletePageWidgets(pageId) {
        return findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                widgets.map(function(widget) {
                    deleteWidget(widget._id)
                });
            })
    }

    function reorderWidget(pageId, startInd, endInd) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                return pageModel
                    .updatePage(pageId, {widgets: reorderWidgetsHelper(page.widgets, startInd, endInd)})
            });
    }

    function reorderWidgetsHelper(widgets, startInd, endInd) {

    }

    function deleteWidget(pageId, widgetId) {
        return widgetModel
            .remove({_id: widgetId})
            .then(function () {
                return pageModel.deleteWidget(pageId, widgetId);
            });
    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update({_id: widgetId}, {$set: widget});
    }

    function findWidgetById(widgetId) {
        return widgetModel.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId) {
        return widgetModel.find({_page: pageId});
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return widgetModel
            .create(widget)
            .then(function (widgetNew) {
                console.log(widgetNew);
                return pageModel
                    .addWidget(pageId, widgetNew._id)
                    .then(function () {
                        return widgetNew;
                    });
            });
    }

}());