module.exports = (function () {
   var mongoose = require('mongoose');

   var agentSchema = mongoose.Schema({
       _user: {require: true, type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
       _spotifyId: {require: true, type: String},
       name: {type: String, require: true},
       pictureUrl: {type: String},
       dateClaimed: {type: Date, default: Date.now()}
   }, {collection: "agent"});

   return agentSchema;
}());