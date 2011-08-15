(function() {
  var counter_name, db, mongoose;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  mongoose = require('mongoose');
  counter_name = null;
  db = null;
  exports.loadAutoIncr = function(database, options) {
    var schema;
    options = options || {};
    counter_name = options.counterName || 'Counter';
    db = database;
    schema = new mongoose.Schema({
      field: {
        type: String,
        unique: true
      },
      c: {
        type: Number,
        "default": 0
      }
    });
    return mongoose.model(counter_name, schema);
  };
  exports.plugin = function(schema, options) {
    var Counter, model_name;
    if (!options.modelName) {
      throw new Error('Missing required parameter: modelName');
    }
    model_name = options.modelName.toLowerCase();
    Counter = db.model(counter_name);
    schema.add({
      autoincr_id: {
        type: Number,
        unique: true
      }
    });
    return schema.pre('save', function(next) {
      return Counter.collection.findAndModify({
        field: model_name
      }, [], {
        $inc: {
          c: 1
        }
      }, {
        "new": true,
        upsert: true
      }, __bind(function(err, doc) {
        var count;
        count = doc.c;
        if (err) {
          return next(err);
        } else {
          this.autoincr_id = count;
          return next();
        }
      }, this));
    });
  };
}).call(this);
