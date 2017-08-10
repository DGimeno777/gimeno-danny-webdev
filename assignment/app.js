module.exports = function (app) {


    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    console.log("heyhey");
    if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        console.log("in1");
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        console.log("in1.1");
        connectionString = 'mongodb://' + username + ':' + password;
        console.log("in1.2");
        connectionString = process.env.MONGODB_URI; // user yours
        console.log("in1.3");
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
