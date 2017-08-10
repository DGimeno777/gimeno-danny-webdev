module.exports = (function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website: {required: true, type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}],
        dateCreated: Date
    }, {collection: "page"});

    return pageSchema;
}());