module.exports = (function () {
    var mongoose = require('mongoose');
    var userSchema = require('assignment/model/user/user.schema.server');
    var userModel = mongoose.model('userModel', userSchema);
    var websiteModel = require('../website/website.model.server.js');

    // Req
    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.updateUser = updateUser;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.findUserByUsername = findUserByUsername;
    userModel.deleteUser = deleteUser;

    // Custom
    userModel.addWebsite = addWebsite;
    userModel.removeWebsiteFromUser = removeWebsiteFromUser;

    return userModel;

    function removeWebsiteFromUser(userId, websiteId) {
        return userModel.update({_id: userId}, {$pullAll: {websites: [websiteId]}});
    }

    function addWebsite(developerId, websiteId) {
        return userModel
            .findUserById(developerId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return userModel
            .update(
                {_id: userId}, {$set: user});
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function deleteUser(userId) {
        return findUserById(userId).then(function (user) {
           if (user.websites.length === 0) {
               return userModel.remove({_id: user});
           }
           else {
               return websiteModel
                   .deleteWebsitesByUser(userId)
                   .then(function () {
                       userModel.remove({_id: user});
                   })
           }
        });
    }
});