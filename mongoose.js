const mongoose = require('mongoose');

var mongooseConnection = function () {
  // return await mongoose.createConnection('mongodb://localhost:27017/myApp', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });
  var man=mongoose.connect('mongodb://localhost:27017/myApp')
} 

module.exports = man;