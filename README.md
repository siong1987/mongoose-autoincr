mongoose-autoincr - autoincrement support for Mongoose
==============

This is a plugin for Mongoose to have an extra `aid` number attribute that autoincrements. This plugin is created to support [Sphinx](http://sphinxsearch.com/).

### Installation
    npm install mongoose-autoincr

### Using the plugin

    var mongoose = require("mongoose");
      , mongooseIncr = require("mongoose-incr");

    var UserSchema = new Schema({
        username: String
    });

    UserSchema.plugin(mongooseIncr);

## Tests
To run tests:
    make test

### License
MIT License

---
### Author
[Teng Siong Ong](https://github.com/siong1987/)