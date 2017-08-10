module.exports = function (app) {


    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    console.log("heyhey");
    if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        console.log("in1");
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += process.env.MLAB_ACCESS_URL; // user yours
    }
    console.log("in2");
    var mongoose = require("mongoose");
    console.log("in3");
    mongoose.connect(connectionString);
    console.log("in4");
    require("./model/model.server");
    console.log("in5");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
