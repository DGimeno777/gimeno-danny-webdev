module.exports = function (app) {

    // http handlers
    app.put("/api/venue/:userId/venuelist/update/:artistSpotifyId", updateVenueArtist);
    app.delete("/api/venue/:userId/venuelist/delete/:artistSpotifyId", removeArtistFromVenueList);
    app.get("/api/venue/:userId/venuelist", findVenueArtistList);
    app.post("/api/venue/:userId/venuelist/add/:artistSpotifyId", addArtistToVenueList);
    app.get("/api/venue/artist/:artistSpotifyId", getAllArtistEntries);
    app.get("/api/venue/all", getAllEntries)

    var venueDbModel = require("../model/venue/venue.model.server")();

    function getAllEntries(req, res) {
        venueDbModel
            .getAllEntries()
            .then(
                function (entries) {
                    res.json(entries);
                }
            )
    }

    function getAllArtistEntries(req, res) {
        venueDbModel
            .getAllShowEntriesForArtist(req.params.artistSpotifyId)
            .then(function (list) {
                res.json(list);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            });
    }

    function addArtistToVenueList(req, res) {
        venueDbModel
            .addShowForUser(req.params.userId, req.params.artistSpotifyId, req.body)
            .then(function (ret) {
                res.json(200);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function findVenueArtistList(req, res) {
        venueDbModel
            .getAllShowsForUser(req.params.userId)
            .then(function (list) {
                res.json(list);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function removeArtistFromVenueList(req, res) {
        venueDbModel
            .removeShowForUser(req.params.userId, req.params.artistSpotifyId)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            })
    }

    function updateVenueArtist(req, res) {
        venueDbModel
            .updateVenueArtist(req.params.userId, req.params.artistSpotifyId, req.body)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });
    }

};