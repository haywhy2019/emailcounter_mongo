var express = require("express");
var mongoose = require("mongoose")
var bodyParser = require("body-parser");
require('dotenv').config();
var routes = require("./server/route")
var db = process.env.MONGO_URI;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public')); 

routes(app);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log(err));





var port = process.env.port  || 8080
app.listen(port, () => console.log(`connected ${port}`));
