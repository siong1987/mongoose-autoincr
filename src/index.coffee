mongoose = require 'mongoose'
counter_name = null
db = null

exports.loadAutoIncr = (database, options) ->
  options = options || {}
  counter_name = options.counterName || 'Counter'

  db = database

  schema = new mongoose.Schema
    field:
      type: String
      unique: true
    c:
      type: Number
      default: 0

  mongoose.model(counter_name, schema)

exports.plugin = (schema, options) ->
  # Check for required options
  if (!options.modelName)
    throw new Error('Missing required parameter: modelName')

  model_name = options.modelName.toLowerCase()
  Counter = db.model counter_name

  schema.add
    autoincr_id:
      type: Number
      unique: true

  schema.pre 'save', (next) ->
    Counter.collection.findAndModify
      field: model_name, [], {$inc: {c: 1}}
        new: true
        upsert: true
      , (err, doc) =>
        count = doc.c
        if err
          next(err)
        else
          this.autoincr_id = count
          next()
