module.exports = (function () {
    var mongoose = require('mongoose');
    var artistSchema = require('./artist.schema.server');
    var artistModel = mongoose.model('artistModel', artistSchema);

    artistModel.addArtistForUser = addArtistForUser;
    artistModel.getArtistForUser = getArtistForUser;
    artistModel.getAllArtistsForUser = getAllArtistsForUser;
    artistModel.getAllArtistEntries = getAllArtistEntries;
    artistModel.removeArtistForUser = removeArtistForUser;
    artistModel.removeUserEntries = removeUserEntries;
    artistModel.getAllEntries = getAllEntries;

    return artistModel;

    function getAllEntries() {
        return artistModel.find();
    }

    function removeUserEntries(userId) {
        return artistModel
            .remove({_user: userId});
    }

    function removeArtistForUser(userId, artistSpotifyId) {
        return artistModel.remove({_user: userId, _spotifyId: artistSpotifyId});
    }

    function getArtistForUser(userId, artistSpotifyId) {
        return artistModel
            .findOne({_user: userId, _spotifyId: artistSpotifyId});
    }

    function getAllArtistsForUser(userId) {
        return artistModel
            .find({_user: userId});
    }

    function getAllArtistEntries(artistSpotifyId) {
        return artistModel
            .find({_spotifyId: artistSpotifyId});
    }

    function addArtistForUser(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;

        return artistModel
            .create(artist);
    }
});