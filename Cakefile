# Module requires
{spawn, exec} = require 'child_process'
sys = require 'sys'

# ## Helpers

# Helper function for showing error messages if anyting happens
printOutput = (process) ->
  process.stdout.on 'data', (data) -> sys.print data
  process.stderr.on 'data', (data) -> sys.print data

# Watch Javascript for changes
watchJS = ->
  coffee = exec 'coffee -cw -o ./ src/'
  printOutput(coffee)

# Tasks
task 'watch', 'Watches all Coffeescript(JS) and Stylus(CSS) files', ->
  watchJS()

task 'test', 'Run all tests', ->
  expresso = exec "./node_modules/expresso/bin/expresso tests/*.test.js"
  printOutput(expresso)

task 'docs', 'Create documentation using Docco', ->
  docco = exec """
    docco src/*.coffee
    docco src/test/*.coffee
  """
  printOutput(docco)
