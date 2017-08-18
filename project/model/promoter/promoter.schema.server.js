module.exports = (function () {
   var mongoose = require('mongoose');

   var promoterSchema = mongoose.Schema({
       _user: {require: true, type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
       _spotifyId: {require: true, type: String},
       name: {type: String, require: true},
       pictureUrl: {type: String},
       showDate: {type: Date, default: Date.now()},
       showLocation: {type: String}
   }, {collection: "promoter"});

   return promoterSchema;
}());