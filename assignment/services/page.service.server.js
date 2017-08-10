//var app = require("../express");

module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pageDbModel = require("../model/page/page.model.server");

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageDbModel
            .deletePage(pageId)
            .then(function () {
                res.status(200);
            })
            .catch(function (error) {
               res.status(error);
            });

        /*
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.status(200);
                return;
            }
        }

        res.sendStatus(404);*/
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageDbModel
            .updatePage(pageId, page)
            .then(function () {
                res.status(200);
            })
            .catch(function (error) {
                res.status(error);
            })

        /*
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p] = page;
                res.json(pages[p]);
                return;
            }
        }

        res.sendStatus(404);*/
    }

    function createPage(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        var page = req.body;

        pageDbModel
            .createPage(websiteId, page)
            .then(function (pageNew) {
                res.json(pageNew);
            })
            .catch(function (error) {
                res.status(error);
            });

        /*
        page._id = (new Date()).getTime() + "";
        page.userId = userId;
        page.websiteId = websiteId;

        pages.push(page);
        res.send(page);
        */
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageDbModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages){
                res.json(pages);
            })
            .catch(function (error) {
                res.status(error);
            });

        /*
        var pagesFound = [];

        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                pagesFound.push(pages[p]);
            }
        }

        res.json(pagesFound);
        */
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageDbModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.status(error);
            });

        /*
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                res.json(pages[p]);
                return;
            }
        }

        res.sendStatus(500);
        */
    }
};