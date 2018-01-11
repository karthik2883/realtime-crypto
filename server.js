'use strict';
const app = require('./app');
const io = require('socket.io').listen(app);
const appConstant = require('./config/appConstant');
const bittrex = require('node-bittrex-api');
var custom_func = require('./utils/custom_function');

var custom_func = new custom_func();
var ticker = [];
io.sockets.on('connection', frwsocket);

function frwsocket(frwstrike) {
  bittrex.websockets.client(function () {
    bittrex.websockets.listen(function (data, client) {
      if (data.M === 'updateSummaryState') {
        data.A.forEach(function (data_for) {
          console.log(data_for);
          data_for.Deltas.forEach(function (marketsDelta) {
            var s = custom_func.saveTicker(marketsDelta).then(function (e) {
              frwstrike.emit('stream', {
                'value:':e
              });
            }).catch(function (err) {
              console.log(err);
            });
          });
        });
      }
    });

  });
}