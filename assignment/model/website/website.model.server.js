module.exports = (function () {
    var mongoose = require('mongoose');
    var websiteSchema = require('assignment/model/website/website.schema.server');
    var websiteModel = mongoose.model('websiteModel', websiteSchema);
    var userModel = require('../user/user.model.server.js');
    var pageModel = require('../page/page.model.server');

    // Req
    websiteModel.createWebsiteForUser = createWebsiteForUser;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;

    // Custom
    websiteModel.deleteWebsitesByUser = deleteWebsitesByUser;
    websiteModel.addPageToWebsite = addPageToWebsite;
    websiteModel.removePageFromWebsite = removePageFromWebsite;

    return websiteModel;

    function addPageToWebsite(websiteId, pageId) {
        return websiteModel
            .update({_id: websiteId}, {$push: {pages: pageId}});
    }

    function removePageFromWebsite(websiteId, pageId) {
        return websiteModel
            .update({_id: websiteId}, {$pullAll: {pages: pageId}});
    }

    function createWebsiteForUser(developerId, website) {
        website._user = developerId;
        return websiteModel
            .create(website)
            .then(function (website) {
               return userModel
                   .addWebsite(userId, website._id);
            });
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel
            .find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update({_id: websiteId}, {$set: website});
    }

    function deleteWebsite(websiteId) {
        return websiteModel
            .findOne({_id: websiteId})
            .then(function (website) {
                userModel.removeWebsiteFromUser(website._user, websiteId);
                pageModel.deletePagesOfWebsite(websiteId);
            })
            .then(function () {
                return websiteModel.remove({_id: websiteId});
            });

    }

    function deleteWebsitesByUser(userId) {
        return findAllWebsitesForUser({_user: userId})
            .then(function (websites) {
                for (var w in websites) {
                    deleteWebsite(websites[w]._id);
                }
            });
    }
}());