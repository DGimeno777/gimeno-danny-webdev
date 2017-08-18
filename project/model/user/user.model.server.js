module.exports = (function () {
    var mongoose = require('mongoose');
    var bcrypt = require('bcrypt-nodejs');
    var userSchema = require('./user.schema.server');
    var userModel = mongoose.model('userModel', userSchema);


    // Req
    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.updateUser = updateUser;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.findUserByUsername = findUserByUsername;
    userModel.deleteUser = deleteUser;
    userModel.addArtistToWatchlist = addArtistToWatchlist;
    userModel.findUserByFacebookId = findUserByFacebookId;
    userModel.findUserByGoogleId = findUserByGoogleId;
    userModel.getAllEntries = getAllEntries;

    // Custom
    //userModel.addWebsite = addWebsite;
    //userModel.removeWebsiteFromUser = removeWebsiteFromUser;

    return userModel;

    function getAllEntries() {
        return userModel.find();
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }
    
    function addArtistToWatchlist(userId, artistSpotifyId) {
        return userModel
            .update({_id: userId}, {$push: {artistWatchList: artistSpotifyId}});
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return userModel
            .update({_id: userId}, {$set: user});
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
            return userModel.remove({_id: user});
        });
    }
});