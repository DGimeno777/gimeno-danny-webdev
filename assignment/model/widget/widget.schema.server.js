module.exports = (function () {
    var mongoose = require('mongoose');

    var widgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'pageModel'},
        type: {required: true, type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
        name: String,
        text: String,
        description: String,
        url: String,
        width: String,
        placeholder: String,
        height: String,
        size: Number,
        class: String,
        rows: Number,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});

    return widgetSchema;
}());