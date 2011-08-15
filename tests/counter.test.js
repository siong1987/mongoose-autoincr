(function() {
  var Card, Counter, User, autoIncr, cardSchema, db, mongoose, userSchema;
  require('should');
  mongoose = require('mongoose');
  db = mongoose.createConnection('mongodb://localhost/mongoose_autoincr_test');
  autoIncr = require('../');
  autoIncr.loadAutoIncr(db);
  userSchema = new mongoose.Schema({
    username: String
  });
  userSchema.plugin(autoIncr.plugin, {
    modelName: 'User'
  });
  mongoose.model('User', userSchema);
  cardSchema = new mongoose.Schema({
    name: String
  });
  cardSchema.plugin(autoIncr.plugin, {
    modelName: 'Card'
  });
  mongoose.model('Card', cardSchema);
  User = null;
  Counter = null;
  Card = null;
  module.exports = {
    before: function() {
      User = db.model('User');
      Card = db.model('Card');
      return Counter = db.model('Counter');
    },
    'test creation of user field on Counter db': function() {
      return Counter.remove({}, function(err) {
        var card;
        card = new Card({
          name: 'john'
        });
        return card.save(function(err) {
          return Counter.findOne({
            field: 'card'
          }, function(err, doc) {
            doc.should.not.be["null"];
            return Card.remove({}, function() {});
          });
        });
      });
    },
    'test autoincrement': function() {
      return User.remove({}, function(err) {
        var checkSequence, usernames;
        usernames = ['john', 'meng', 'heng'];
        checkSequence = function(next) {
          var user, username;
          if (usernames.length === 0) {
            next();
            return;
          }
          username = usernames.pop();
          user = new User({
            username: username
          });
          return user.save(function(err) {
            return User.findOne({
              username: username
            }, function(err, doc) {
              doc.should.not.be["null"];
              return checkSequence(next);
            });
          });
        };
        return checkSequence(function() {
          return User.remove({}, function(err) {});
        });
      });
    }
  };
}).call(this);
