module.exports = (function () {
    var mongoose = require('mongoose');
    var agentSchema = require('./agent.schema.server');
    var agentModel = mongoose.model('agentModel', agentSchema);

    agentModel.claimArtistForUser = claimArtistForUser;
    agentModel.getAllArtistsForUser = getAllArtistsForUser;
    agentModel.getAllEntriesForArtist = getAllEntriesForArtist;
    agentModel.updateAgentArtist = updateAgentArtist;
    agentModel.deleteAgentArtistEntry = deleteAgentArtistEntry;
    agentModel.removeUserEntries = removeUserEntries;

    return agentModel;

    function removeUserEntries(userId) {
        return agentModel
            .remove({_user: userId});
    }

    function deleteAgentArtistEntry(userId, artistSpotifyId) {
        return agentModel
            .remove({_user: userId, _spotifyId: artistSpotifyId});
    }

    function updateAgentArtist(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;
        return agentModel.update({_user: userId}, {$set: artist});
    }

    function getAllArtistsForUser(userId) {
        return agentModel
            .find({_user: userId});
    }

    function getAllEntriesForArtist(artistSpotifyId) {
        return agentModel
            .find({_spotifyId: artistSpotifyId});
    }

    function claimArtistForUser(userId, artistSpotifyId, artist) {
        artist._user = userId;
        artist._spotifyId = artistSpotifyId;

        return agentModel
            .create(artist);
    }
});