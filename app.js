var http = require("http");
var url = require('url');
var fs = require('fs');
var express = require('express');
app = express();
app.use(express.static(__dirname + '/view'));
 
var api = express.Router();

api.put('/', function (req, res) {
   console.log("im here");
    res.sendFile('./signup.html')
});


var server = http.createServer(app);
server.listen(8000);
module.exports = server;