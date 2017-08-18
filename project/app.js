module.exports = function (app, querystring, request) {

    var connectionString = 'mongodb://127.0.0.1:27017/project2'; // for local
    if (process.env.MONGODB_URI) { // check if running remotely
        connectionString = process.env.MONGODB_URI; // user yours
    }
    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    require("./model/model.server");
    require("./services/user.service.server.js")(app);
    require("./services/agent.service.server")(app);
    require("./services/venue.service.server")(app);
    require("./services/promoter.service.server")(app);
    require("./services/spotify.service.server.js")(app);
    require("./spotify/authorization1")(app, querystring, request);
};