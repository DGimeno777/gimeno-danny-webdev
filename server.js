module.exports = (function() {
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(__dirname + '/public'));

    require("./assignment/app")(app);

    app.listen(process.env.PORT || 3000);

})();