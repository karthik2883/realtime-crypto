'use strict';
var appConstant = require('./config/appConstant');
var bittrex = require('node-bittrex-api');
var custom_func  = require('./utils/custom_function');
var custom_func = new custom_func();

// custom_func.getData().then(function(e){
//     console.log(e);
// }).catch(function(err){
//     console.log(err);
// });
bittrex.websockets.client(function() {
    console.log('Websocket connected');
    bittrex.websockets.listen(function(data, client) {
      if (data.M === 'updateSummaryState') {
        data.A.forEach(function(data_for) {
            data_for.Deltas.forEach(function(marketsDelta) {
             var s = custom_func.saveTicker(marketsDelta).then(function(e){
                console.log("resolve");
            }).catch(function(err){
                console.log(err);
            });
          });
        });
      }
    });
  });