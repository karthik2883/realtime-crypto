'use strict';

var appConstant = require('./config/appConstant');
var bittrex = require('node-bittrex-api');
var custom_func  = require('./utils/custom_function');
var custom_func = new custom_func();
 
bittrex.websockets.client(function() {
     bittrex.websockets.listen(function(data, client) {
      if (data.M === 'updateSummaryState') {
        data.A.forEach(function(data_for) {
            data_for.Deltas.forEach(function(marketsDelta) {
             var s = custom_func.saveTicker(marketsDelta).then(function(e){
                 
            }).catch(function(err){
                 
            });
          });
        });
      }
    });
  });