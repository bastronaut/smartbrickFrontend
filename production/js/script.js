var OCCUPIEDTEXT = 'Occupied';
var AVAILABLETEXT = 'Available';
var mqttserver = 'm21.cloudmqtt.com';
var user = 'whccpczo';
var userpw = 'ebF4XZrEmZhl';
var wsport = 	33964;
var topic = '/ddnl-iot-poc/#';
var DDSmartBrickIot = 'hansiskreezie'; // random arbitrary id

// Create a client instance
client = new Paho.MQTT.Client(mqttserver, wsport, DDSmartBrickIot);
//Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: true,
  userName: user,
  password: userpw,
  onSuccess:onConnect,
  onFailure:doFail
}

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(topic);

  // message = new Paho.MQTT.Message("Hello CloudMQTT");
  // message.destinationName = "/cloudmqtt";
  // client.send(message);
}

function doFail(e){
  console.log('fail');
  console.log(e);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  console.log('on connectionlost..');
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName);
  toggleParkStatus(message.destinationName, message.payloadString);

  console.log("onMessageArrived:"+message.payloadString);
}

function toggleParkStatus(parkNumber, distance) {
  switch(parkNumber) {
    case '/ddnl-iot-poc/1768451':
      toggleParkClass(1, distance);
    break;

    case '/ddnl-iot-poc/8970155':
      toggleParkClass(2, distance);
    break;

    case '/ddnl-iot-poc/1506274':
      toggleParkClass(3, distance);
    break;

    case '/ddnl-iot-poc/8396838':
      toggleParkClass(4, distance);
    break;
  }
}

function toggleParkClass(parkNumber, distance) {
  if (parseInt(distance) > 10 && parseInt(distance) < 100) {
      $(".park" + parkNumber).removeClass("parkavailable").addClass("parkoccupied");
      $(".parktext" + parkNumber).text(OCCUPIEDTEXT);
  } else {
      $(".park"+parkNumber).removeClass("parkoccupied").addClass("parkavailable");
      $(".parktext" + parkNumber).text(AVAILABLETEXT);
  }
}

// classes: parkavailable, parkoccupied
// devices:
// `8396838`
// `8970155`
// `1506274`
// `1768451`

// park1 , park2, park3, park4
// parktext1, parktext2, parktext3, parktext4
