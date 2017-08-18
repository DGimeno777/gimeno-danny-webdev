module.exports = (function () {
   var mongoose = require('mongoose');

   var artistSchema = mongoose.Schema({
       _user: {require: true, type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
       _spotifyId: {require: true, type: String},
       name: {type: String, require: true},
       pictureUrl: {type: String},
       dateAdded: {type: Date, default: Date.now()}
   }, {collection: "artist"});

   return artistSchema;
}());