require 'should'

mongoose = require 'mongoose'

db = mongoose.createConnection 'mongodb://localhost/mongoose_autoincr_test'

module.exports =
  'test creation of optional counterName model': ->
    require('../').loadAutoIncr mongoose,
      counterName: 'Seq'

    Seq = db.model 'Seq'
    Seq.remove {}, (err) ->
      count = new Seq
        field: 'user'
      count.save (err) ->
        count.isNew.should.be.false
        Seq.remove {}, (err) ->
