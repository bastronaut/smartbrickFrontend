// var host = location.origin.replace(/^http/, 'ws');
// var ws = new WebSocket(host);
// var OCCUPIEDTEXT = 'Occupied';
// var AVAILABLETEXT = 'Available';
//
// ws.onmessage = function (message) {
//     console.log('msg received!');
//     handleIncomingMessage(message);
// };
//
// function handleIncomingMessage(message) {
//   try {
//     var webserviceData = JSON.parse(message.data);
//     console.log('wsdata:', webserviceData);
//   } catch (err) {
//     console.log('error parsing json:', err);
//     return false;
//   }
// }
//
// function toggleParkStatus(brickNumber) {
//   switch (brickNumber) {
//     case '14727268':
//       console.log('14727268')
//       break;
//     case '1768451':
//       console.log('1768451');
//       break;
//     case '8970155':
//       console.log('8970155');
//       break;
//   }
}

// devices:
//  /ddnl-iot-poc/14727268
//  /ddnl-iot-poc/1768451
// /ddnl-iot-poc/8970155

// park1 , park2, park3, park4
// parktext1, parktext2, parktext3, parktext4
