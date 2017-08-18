module.exports = (function () {
    var mongoose = require('mongoose');
    var promoterSchema = require('./promoter.schema.server');
    var promoterModel = mongoose.model('promoterModel', promoterSchema);

    promoterModel.addShowForUser = addShowForUser;
    promoterModel.getShowForUser = getShowForUser;
    promoterModel.getAllShowsForUser = getAllShowsForUser;
    promoterModel.getAllShowEntriesForArtist = getAllShowEntriesForArtist;
    promoterModel.removeShowForUser = removeShowForUser;
    promoterModel.removeUserEntries = removeUserEntries;
    promoterModel.updatePromoterArtist = updatePromoterArtist;
    promoterModel.getArtistEntries = getArtistEntries;
    promoterModel.getAllEntries = getAllEntries;

    return promoterModel;

    function getAllEntries() {
        return promoterModel.find();
    }

    function getArtistEntries() {
        return promoterModel
            .find({_spotifyId: artistSpotifyId});
    }

    function updatePromoterArtist(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;
        return promoterModel.update({_user: userId}, {$set: artist});
    }

    function removeUserEntries(userId) {
        return promoterModel
            .remove({_user: userId});
    }

    function removeShowForUser(userId, artistSpotifyId) {
        return promoterModel
            .remove({_user: userId, _spotifyId: artistSpotifyId});
    }

    function getShowForUser(showId) {
        return promoterModel
            .find(showId);
    }

    function getAllShowsForUser(userId) {
        return promoterModel
            .find({_user: userId});
    }

    function getAllShowEntriesForArtist(artistSpotifyId) {
        return promoterModel
            .find({_spotifyId: artistSpotifyId});
    }

    function addShowForUser(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;

        return promoterModel
            .create(artist);
    }
});