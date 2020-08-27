var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
 
  email:   {type: String, required: true, unique: true, index: { unique: true }},
  date: {type: Date, default: Date.now}

});

var Email = mongoose.model('Email', EmailSchema);

module.exports = Email;
