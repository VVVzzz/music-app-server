var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var songCollectionSchema = new Schema({
  username: { type: String },
  songid:{type:Number}
});

module.exports = mongoose.model('SongCollection', songCollectionSchema);


