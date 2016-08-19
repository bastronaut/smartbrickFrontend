var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000
var mqtt = require("mqtt")
var jsonfile = require('jsonfile')

//  /ddnl-iot-poc/14727268
//  /ddnl-iot-poc/1768451
// /ddnl-iot-poc/8970155

app.use(express.static("."));

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({ server: server })
console.log("websocket server created")

wss.on("connection", function (ws) {
    console.log("websocket connection open")
    ws.on("close", function () {
        console.log("websocket connection close")
        /*clearInterval(id)*/
    })
})

/// MQTT part
var mqttClient = mqtt.connect('mqtt://broker.mqttdashboard.com', {});

mqttClient.on('connect', function () {
  var topic = '/ddnl-iot-poc/#';
  console.log('Subscribing to ' + topic);
  mqttClient.subscribe(topic);
});

mqttClient.on('message', function (topic, messageBuffer) {
    // messageBuffer is Buffer
    console.log(topic);
    var messageJson = messageBuffer.toString();
    var message = JSON.parse(messageJson);

    console.dir(message);
    // var payload = base64Decode(message.payload);
    // var payloadObject = parsePayloadToObject(payload);

    wss.clients.forEach(function each(client) {
        var jsonData = JSON.stringify(dashboardData);
        client.send(jsonData);
    });
});
