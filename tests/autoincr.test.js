(function() {
  var db, mongoose;
  require('should');
  mongoose = require('mongoose');
  db = mongoose.createConnection('mongodb://localhost/mongoose_autoincr_test');
  module.exports = {
    'test creation of optional counterName model': function() {
      var Seq;
      require('../').loadAutoIncr(mongoose, {
        counterName: 'Seq'
      });
      Seq = db.model('Seq');
      return Seq.remove({}, function(err) {
        var count;
        count = new Seq({
          field: 'user'
        });
        return count.save(function(err) {
          count.isNew.should.be["false"];
          return Seq.remove({}, function(err) {});
        });
      });
    }
  };
}).call(this);
