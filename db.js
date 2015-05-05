var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-cms', function () {
  console.log('mongodb/mean-cms connected');
});
module.exports = mongoose;
