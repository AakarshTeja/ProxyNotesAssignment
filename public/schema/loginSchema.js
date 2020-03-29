const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const LoginSchema = new Schema({
  _id: ObjectId,
  userName: String,
  email: String,
  password: String,
  otp: Number,
  otp_generated_time: Date
});

module.exports = mongoose.model('login', LoginSchema, 'login');