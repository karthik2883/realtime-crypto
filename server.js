'use strict';
var app = require('./app');
var io = require('socket.io').listen(app);
var appConstant = require('./config/appConstant');
var bittrex = require('node-bittrex-api');
var custom_func  = require('./utils/custom_function');
var custom_func = new custom_func();
 /*// var io = require('socket.io').listen(server);
// //turn off debug
// //io.set('log level', 1);
// // define interactions with client
io.sockets.on('connection', function (socket) {
    //send data to client
    setInterval(function () {
        socket.emit('stream', {
            'title': "A new title via Socket.IO!"
        });
    }, 1000);
// });*/
bittrex.websockets.client(function() {
     bittrex.websockets.listen(function(data, client) {
      if (data.M === 'updateSummaryState') {
        data.A.forEach(function(data_for) {
            data_for.Deltas.forEach(function(marketsDelta) {
             var s = custom_func.saveTicker(marketsDelta).then(function(e){
               var ticker  = e;
              io.sockets.on('connection', function (socket) {
                //send data to client
                  socket.emit('stream', {
                        'title:':ticker['MarketName']
                   });
                
              });
            }).catch(function(err){
                 
            });
          });
        });
      }
    });
  });