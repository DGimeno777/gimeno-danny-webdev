module.exports = function (app) {

    // http handlers
    app.put("/api/promoter/:userId/promoterlist/update/:artistSpotifyId", updatePromoterArtist);
    app.delete("/api/promoter/:userId/promoterlist/delete/:artistSpotifyId", removeArtistFromPromoterList);
    app.get("/api/promoter/:userId/promoterlist", findPromoterArtistList);
    app.post("/api/promoter/:userId/promoterlist/add/:artistSpotifyId", addArtistToPromoterList);
    app.get("/api/promoter/artist/:artistSpotifyId", getArtistEntries);
    app.get("/api/promoter/all", getAllEntries);
    var promoterDbModel = require("../model/promoter/promoter.model.server")();

    function getAllEntries(req, res) {
        promoterDbModel
            .getAllEntries()
            .then(
                function (entries) {
                    res.json(entries);
                }
            )
    }

    function getArtistEntries(req, res) {
        promoterDbModel
            .getAllShowEntriesForArtist(req.params.artistSpotifyId)
            .then(function (list) {
                res.json(list);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            });
    }

    function addArtistToPromoterList(req, res) {
        promoterDbModel
            .addShowForUser(req.params.userId, req.params.artistSpotifyId, req.body)
            .then(function (ret) {
                res.json(200);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function findPromoterArtistList(req, res) {
        promoterDbModel
            .getAllShowsForUser(req.params.userId)
            .then(function (list) {
                res.json(list);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function removeArtistFromPromoterList(req, res) {
        promoterDbModel
            .removeShowForUser(req.params.userId, req.params.artistSpotifyId)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            })
    }

    function updatePromoterArtist(req, res) {
        promoterDbModel
            .updatePromoterArtist(req.params.userId, req.params.artistSpotifyId, req.body)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });
    }

};