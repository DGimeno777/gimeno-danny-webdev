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
                    .update({_id: pageId}, {widgets: reorderWidgetsHelper(page.widgets, pageId, startInd, endInd)});
            })
    }

    function reorderWidgetsHelper(widgets, pageId, startIndex, endIndex) {
        //console.log("ReorderGo!");
        //console.log(widgets);
        var pageWidgets = [];

        for (var t in widgets) {
            if (widgets[t]._page === pageId) {
                pageWidgets.push(widgets[t]);
            }
        }

        for (var pw in pageWidgets) {
            for (var w in widgets) {
                if (widgets[w]._id === pageWidgets[pw]._id) {
                    widgets.splice(w, 1);
                }
                break;
            }
        }
        var startWidget = pageWidgets[startIndex];

        if (startIndex > endIndex) {
            for (var s = startIndex; s > endIndex; s--) {
                pageWidgets[s] = pageWidgets[s-1];
            }
            pageWidgets[endIndex] = startWidget;
        }
        else if (startIndex < endIndex) {
            for (var i = startIndex; i < endIndex; i++) {
                pageWidgets[i] = pageWidgets[i+1];
            }
            pageWidgets[endIndex] = startWidget;
        }

        for (var q in pageWidgets) {
            widgets.push(pageWidgets[q]);
        }

        //console.log(widgets);

        return widgets;
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