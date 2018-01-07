const http = require("http");
const process = require("process");
const url = require('url');
const fs = require('fs');
var express = require('express');
const path = require('path');
const app = express();
const engine = require('consolidate');
app.use(express.static(path.join(__dirname, 'view')));
app.set('views', __dirname + '/view');
app.engine('html', engine.mustache);
app.set('view engine', 'html');
app.get('/', function (req, res) {
   //  console.log("im here");
    // res.render("signup");
    res.render('signup.html')
});
process.setMaxListeners(0);
const server = http.createServer(app);
server.listen(8000);
module.exports = server;