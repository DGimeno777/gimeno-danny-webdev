module.exports = (function() {
    var express = require('express');
    var bodyParser = require('body-parser');
    var request = require('request'); // "Request" library
    var querystring = require('querystring');
    var cookieParser = require('cookie-parser');

    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(express.static(__dirname + '/public'));

    require("./assignment/app")(app);
    console.log("yoyoy");
    require("./project/app")(app);
    console.log("yoyoy");
    app.listen(process.env.PORT || 3000);

})();