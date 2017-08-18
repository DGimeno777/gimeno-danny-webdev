module.exports = function (app) {

    // http handlers
    app.put("/api/promoter/:userId/promoterlist/update/:artistSpotifyId", updatePromoterArtist);
    app.delete("/api/promoter/:userId/promoterlist/delete/:artistSpotifyId", removeArtistFromPromoterList);
    app.get("/api/promoter/:userId/promoterlist", findPromoterArtistList);
    app.post("/api/promoter/:userId/promoterlist/add/:artistSpotifyId", addArtistToPromoterList);

    var promoterDbModel = require("../model/promoter/promoter.model.server")();

    function addArtistToPromoterList(req, res) {
        console.log("agent.service.server");
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
        console.log("agent.service.server-list");
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
        console.log("agent.service.server-remove");
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