var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var listCollectionSchema = new Schema({
  username: { type: String },
  listid:{type:Number}
});

module.exports = mongoose.model('ListCollection', listCollectionSchema);


