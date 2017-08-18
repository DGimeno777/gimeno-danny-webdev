module.exports = (function () {
    var mongoose = require('mongoose');
    var venueSchema = require('./venue.schema.server');
    var venueModel = mongoose.model('venueModel', venueSchema);

    venueModel.addShowForUser = addShowForUser;
    venueModel.getShowForUser = getShowForUser;
    venueModel.getAllShowsForUser = getAllShowsForUser;
    venueModel.getAllShowEntriesForArtist = getAllShowEntriesForArtist;
    venueModel.removeShowForUser = removeShowForUser;
    venueModel.removeUserEntries = removeUserEntries;
    venueModel.updateVenueArtist = updateVenueArtist;
    venueModel.getAllEntries = getAllEntries;

    return venueModel;

    function getAllEntries() {
        return venueModel.find();
    }

    function updateVenueArtist(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;
        return venueModel.update({_user: userId}, {$set: artist});
    }

    function removeUserEntries(userId) {
        return venueModel
            .remove({_user: userId});
    }

    function removeShowForUser(userId, artistSpotifyId) {
        return venueModel
            .remove({_user: userId, _spotifyId: artistSpotifyId});
    }

    function getShowForUser(showId) {
        return venueModel
            .find(showId);
    }

    function getAllShowsForUser(userId) {
        return venueModel
            .find({_user: userId});
    }

    function getAllShowEntriesForArtist(artistSpotifyId) {
        return venueModel
            .find({_spotifyId: artistSpotifyId});
    }

    function addShowForUser(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;

        return venueModel
            .create(artist);
    }
});