module.exports = (function () {
   var mongoose = require('mongoose');

   var types = ['Researcher', 'Agent', 'Promoter', 'Venue'];

   var userSchema = mongoose.Schema({
       username: {require: true, type: String, unique: true},
       password: {require: true, type: String},
       name: {require: true, type: String},
       email: {require: true, type: String},
       facebook:   {
           id:    String,
           token: String
       },
       google:   {
           id:    String,
           token: String
       },
       type: {require: true, type: String, enum: types}
   }, {collection: "user"});

   return userSchema;
}());