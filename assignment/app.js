module.exports = function (app) {

    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if (process.env.MONGODB_URI) { // check if running remotely
        connectionString = process.env.MONGODB_URI; // user yours
    }
    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    require("./model/model.server");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
