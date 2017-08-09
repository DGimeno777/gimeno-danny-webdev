module.exports = (function () {
   var mongoose = require('mongoose');

   var userSchema = mongoose.Schema({
       username: {type: String, require: true, unique: true},
       password: {type: String, require: true},
       firstName: {type: String},
       lastName: {type: String},
       email: {type: String},
       phone: {type: String},
       websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
       dateCreated: {type: Date, default: Date.now}
   }, {collection: "user"});

   return userSchema;
}());