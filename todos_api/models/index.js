var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api");

mongoose.Promise = Promise; // it allows us to use promise syntax.

module.exports.Todo = require("./todo");