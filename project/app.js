module.exports = function (app, querystring, request) {
    require("./services/user.service.server.js")(app);
    require("./services/spotify.service.server.js")(app);
    require("./spotify/authorization1")(app, querystring, request);
};