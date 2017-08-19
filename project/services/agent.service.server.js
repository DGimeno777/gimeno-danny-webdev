module.exports = function (app) {

    // http handlers
    app.put("/api/agent/:userId/agentlist/update/:artistSpotifyId", updateAgentArtist);
    app.delete("/api/agent/:userId/agentlist/delete/:artistSpotifyId", removeArtistFromAgentList);
    app.get("/api/agent/:userId/agentlist", findAgentArtistList);
    app.get("/api/agent/artist/:artistSpotifyId", getArtistEntries);
    app.post("/api/agent/:userId/agentlist/add/:artistSpotifyId", addArtistToAgentList);
    app.get("/api/agent/all", getAllEntries);

    var agentDbModel = require("../model/agent/agent.model.server")();

    function getAllEntries(req, res) {
        agentDbModel
            .getAllEntries()
            .then(
                function (entries) {
                    res.json(entries);
                }
            )
    }

    function getArtistEntries(req, res) {
        agentDbModel
            .getAllEntriesForArtist(req.params.artistSpotifyId)
            .then(function (list) {
                res.json(list);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            });
    }

    function addArtistToAgentList(req, res) {
        agentDbModel
            .claimArtistForUser(req.params.userId, req.params.artistSpotifyId, req.body)
            .then(function (ret) {
                res.json(200);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function findAgentArtistList(req, res) {
        agentDbModel
            .getAllArtistsForUser(req.params.userId)
            .then(function (list) {
                res.json(list);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function removeArtistFromAgentList(req, res) {
        agentDbModel
            .deleteAgentArtistEntry(req.params.userId, req.params.artistSpotifyId)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            })
    }

    function updateAgentArtist(req, res) {
        agentDbModel
            .updateAgentArtist(req.params.userId, req.params.artistSpotifyId, req.body)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });
    }

};