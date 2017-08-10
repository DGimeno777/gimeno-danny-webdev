module.exports = (function () {
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server');
    var pageModel = mongoose.model('pageModel', pageSchema);
    var websiteModel = function () {
        return require('../website/website.model.server');
    }();

    // Req
    pageModel.createPage = createPage;
    pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
    pageModel.findPageById = findPageById;
    pageModel.updatePage = updatePage;
    pageModel.deletePage = deletePage;

    // Custom
    pageModel.addWidget = addWidget;
    pageModel.deleteWidget = deleteWidget;

    return pageModel;

    function deletePage(websiteId, pageId) {
        console.log("heheh");
        return pageModel
            .remove({_id: pageId})
            .then(function (page) {
                console.log("herehere");
                return websiteModel
                    .removePageFromWebsite(websiteId, pageId);
            });
    }

    function updatePage(pageId, page) {
        return pageModel.update({_id: pageId}, {$set: page});
    }

    function findPageById(pageId) {
        return pageModel.findById(pageId);
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel
            .find({_website: websiteId})
            .populate('_website', 'name')
            .exec();
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return pageModel
            .create(page)
            .then(function (page) {
               return websiteModel
                   .addPageToWebsite(websiteId, page._id);
            });
    }

    function addWidget(pageId, widgetId) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.push(widgetId);
                return page.save();
            });
    }

    function deleteWidget(pageId, widgetId) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                page.widgets.splice(page.widgets.indexOf(widgetId), 1);
                return page.save();
            });
    }



}());