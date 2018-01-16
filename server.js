'use strict';
const app = require('./app');
const io = require('socket.io').listen(app);
const appConstant = require('./config/appConstant');
const bittrex = require('node-bittrex-api');
const async = require('async');
var custom_func = require('./utils/custom_function');

var custom_func = new custom_func();

io.sockets.on('connection', frwsocket);
function frwsocket(frwstrike) {
bittrex.websockets.client(function () {
  bittrex.websockets.listen(function (data, client) {
    if(data.M === 'updateSummaryState') {
      async.eachSeries(data.A, (value, key) => {
        async.eachSeries(value.Deltas, (marketInfo, marketInfokey) => {
          custom_func.updateDB(marketInfo.MarketName ,marketInfo).then(function(e) {
            console.log(e);
            if(e===0){      
              custom_func.saveTicker(marketInfo).then(function (e) {
                 console.log(e)
              }).catch(function (err) {
                console.log(err);
              });
             }else{
              custom_func.getTickerSorted(marketInfo.MarketName).then(function (e) {
                frwstrike.emit('stream', {
                  'value:': e
                });    
              });    
             }
          });
        });
      });
     }
  });
});
}


// function frwsocket(frwstrike) {
//   var interval = setInterval(function () {
//     custom_func.getTickerSorted().then(function (e) {
//      // console.log(e);

//     });
//   }, 1000, "Hello.", "How are you?");
// }
//clearInterval(interval);