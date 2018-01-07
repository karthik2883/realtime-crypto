'use strict';
var app = require('./app');
var io = require('socket.io').listen(app);
var appConstant = require('./config/appConstant');
var bittrex = require('node-bittrex-api');
var custom_func  = require('./utils/custom_function');
var custom_func = new custom_func();
var ticker =[] ; 
bittrex.websockets.client(function() {
     bittrex.websockets.listen(function(data, client) {
      if (data.M === 'updateSummaryState') {
          data.A.forEach(function(data_for) {
            data_for.Deltas.forEach(function(marketsDelta) {
             var s = custom_func.saveTicker(marketsDelta).then(function(e){
               ticker.push(e);
               io.sockets.on('connection', function (socket) {
                //send data to client
                  socket.emit('stream', {
                        'value:':ticker
                   });
                
              });
            }).catch(function(err){
                 
            });
          });
        });
      }
    });
  });