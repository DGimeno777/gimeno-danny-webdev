module.exports = function (app) {
    require("./services/general.service.server.js")(app);
    require("./services/spotify.service.server.js")(app);
};