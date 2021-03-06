//var app = require("../express");

module.exports = function (app) {

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

    var widgetTypes = [
        'HEADING',
        'IMAGE',
        'YOUTUBE',
        'HTML',
        'INPUT',
        'TEXT'
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/page/:pageId/widget/:widgetId", createWidgetFromId)
    app.get("/api/widget/newWidgetId", generateNewWidgetId);
    app.get("/api/widget/widgetTypes", getWidgetTypes);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", updateWidgetPosition)
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgetDbModel = require("../model/widget/widget.model.server");

    function updateWidgetPosition(req, res) {
        var startIndex = parseInt(req.query.startIndex) + 0;
        var endIndex = parseInt(req.query.endIndex) + 0;
        var pageId = req.params.pageId;

        widgetDbModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function () {
                res.status(200);
            })
            .catch(function (error) {
                res.status(error);
            })

        /*
         var pageWidgets = [];

         for (var w in widgets) {
         if (widgets[w].pageId === pageId) {
         pageWidgets.push(widgets[w]);
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
         for (var i = startIndex; i > endIndex; i--) {
         pageWidgets[i] = pageWidgets[i-1];
         }
         pageWidgets[endIndex] = startWidget;
         }
         else if (startIndex < endIndex) {
         for (var i = startIndex; i < endIndex; i++) {
         pageWidgets[i] = pageWidgets[i+1];
         }
         pageWidgets[endIndex] = startWidget;
         }

         for (var w in pageWidgets) {
         widgets.push(pageWidgets[w]);
         }

         res.json("Nothing");
         */
    }

    function generateNewWidgetId(req, res) {
        res.json((new Date()).getTime() + "");
    }

    function getWidgetTypes(req, res) {
        res.json(widgetTypes);
    }

    function createWidgetFromId(req, res) {
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widget.pageId = pageId;
        widget._id = widgetId;

        widgetDbModel
            .createWidget(pageId, widget)
            .then(function (widgetNew) {
                console.log(widget);
                res.json(widgetNew);
            })
            .catch(function (error) {
                res.status(error);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;

        var widget = req.body;
        widget.pageId = pageId;
        //widget._id = (new Date()).getTime();

        widgetDbModel
            .createWidget(pageId, widget)
            .then(function (widgetNew) {
                console.log(widget);
                res.json(widgetNew)
            })
            .catch(function (error) {
                res.status(error);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetDbModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            })
            .catch(function (error) {
               res.status(error);
            });
        /*
        var widgetsFound = [];

        for (var w in widgets) {
            console.log(widgets[w]);
            if (widgets[w].pageId === pageId) {
                widgetsFound.push(widgets[w]);
            }
        }

        res.json(widgetsFound);*/
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        console.log(widgetId);

        widgetDbModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            })
            .catch(function (error) {
               res.status(error);
            });

        /*
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }

        res.sendStatus(404);*/
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetDbModel
            .updateWidget(widgetId, widget)
            .then(function () {
                res.status(200);
            })
            .catch(function (error) {
                res.status(error);
            });

        /*
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);*/
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetDbModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            })
            .catch(function (error) {
                res.status(error);
            })
        
        /*
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);*/
    }
};