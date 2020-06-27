var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String },
    userpwd: { type: String },
    userpwdConfirm:{type:String}
});

module.exports = mongoose.model('User', UserSchema);


