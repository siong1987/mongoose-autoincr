require 'should'

mongoose = require 'mongoose'

db = mongoose.createConnection 'mongodb://localhost/mongoose_autoincr_test'

autoIncr = require('../')
autoIncr.loadAutoIncr(db)

userSchema = new mongoose.Schema
  username: String

userSchema.plugin autoIncr.plugin,
  modelName: 'User'
mongoose.model('User', userSchema)

cardSchema = new mongoose.Schema
  name: String

cardSchema.plugin autoIncr.plugin,
  modelName: 'Card'
mongoose.model('Card', cardSchema)

User = null
Counter = null
Card = null

module.exports =
  before: ->
    User = db.model('User')
    Card = db.model('Card')
    Counter = db.model('Counter')

  'test creation of user field on Counter db': ->
    Counter.remove {}, (err) ->
      card = new Card
        name: 'john'
      card.save (err) ->
        Counter.findOne
          field: 'card'
          , (err, doc) ->
            doc.should.not.be.null
            Card.remove {}, ->

  'test autoincrement': ->
    User.remove {}, (err) ->
      usernames = ['john', 'meng', 'heng']
      checkSequence = (next) ->
        if usernames.length == 0
          next()
          return
        username = usernames.pop()
        user = new User
          username: username
        user.save (err) ->
          User.findOne
            username: username
            , (err, doc) ->
              doc.should.not.be.null
              checkSequence(next)
      checkSequence ->
        User.remove {}, (err) ->
