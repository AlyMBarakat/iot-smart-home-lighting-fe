const switchBtn = [
    document.getElementById("livingRoom"),
    document.getElementById("kitchen"),
    document.getElementById("bedroom"),
    document.getElementById("garage"),
];
let switchState = [false, false, false, false];
let roomsNames = [
    "Living-Room",
    "Kitchen",
    "Bedroom",
    "Garage",
];

const livingRoomNumber = 0;
const kitchenNumber = 1;
const bedroomNumber = 2;
const garageNumber = 3;


/*
*
*   MQTT broker connection
*
*/
let mqtt;
let reconnectTimeout = 2000;
// connect to heroku broker
// let host = "iot-smart-home-broker.herokuapp.com/"; //change this
// let port = 80;

// connect to hive mqtt broker 
let host = "broker.mqttdashboard.com"; //change this
let port = 8000;

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connected ");
    // mqtt.subscribe("sensor1");
    message = new Paho.MQTT.Message("Greetings from web client");
    message.destinationName = "home-listen";
    mqtt.send(message);
}
function MQTTconnect() {
    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, "web_client");
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
    };
    mqtt.connect(options); //connect
}

MQTTconnect();


/*
*
*   Switch buttons handlers
*
*/
switchBtn[livingRoomNumber].addEventListener('click', () => {
    // change switch state globally
    switchState[livingRoomNumber] = !switchState[livingRoomNumber];
    sendLightStateMessage(livingRoomNumber);
    pushNotification(livingRoomNumber);
});

switchBtn[kitchenNumber].addEventListener('click', () => {
    // change switch state globally
    switchState[kitchenNumber] = !switchState[kitchenNumber];
    sendLightStateMessage(kitchenNumber)
    pushNotification(kitchenNumber);
});

switchBtn[bedroomNumber].addEventListener('click', () => {
    // change switch state globally
    switchState[bedroomNumber] = !switchState[bedroomNumber];
    sendLightStateMessage(bedroomNumber)
    pushNotification(bedroomNumber);
});

switchBtn[garageNumber].addEventListener('click', () => {
    // change switch state globally
    switchState[garageNumber] = !switchState[garageNumber];
    sendLightStateMessage(garageNumber)
    pushNotification(garageNumber);
});



function showNotification(permission, roomNumber) {
    if (permission !== 'granted')
        return;

    if (switchState[roomNumber]) {
        let notification = new Notification('Smart Home app', {
            body: roomsNames[roomNumber] + " light is ON",
        });
    }
    else {
        let notification = new Notification('Smart Home app', {
            body: roomsNames[roomNumber] + " light is OFF",
        });
    }
}

function pushNotification(roomNumber) {
    if (!window.Notification) return;
    try {
        Notification.requestPermission()
            .then(permission => showNotification(permission, roomNames))
    } catch (error) {
        if (error instanceof TypeError) {
            Notification.requestPermission(permission => showNotification(permission, roomNumber));
        } else {
            throw error;
        }
    }
}

function sendLightStateMessage(roomNumber) {
    if (switchState[roomNumber]) {
        message = new Paho.MQTT.Message("on");
    }
    else {
        message = new Paho.MQTT.Message("off");
    }
    console.log("home/" + roomsNames[roomNumber] + "/lighting");
    message.destinationName = "home/" + roomsNames[roomNumber] + "/lighting";
    mqtt.send(message);
}