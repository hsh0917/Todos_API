var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://hsh0917:tjrghks1@ds129394.mlab.com:29394/todolist");

mongoose.Promise = Promise; // it allows us to use promise syntax.

module.exports.Todo = require("./todo");