// Rooms numbers
const livingRoomNumber = 0;
const kitchenNumber = 1;
const bedroomNumber = 2;
const garageNumber = 3;

// Rooms switch states
let switchState = [false, false, false, false];

// DOM ELements checkobox(switches) ids
const switchBtn = [
    document.getElementById("livingRoom"),
    document.getElementById("kitchen"),
    document.getElementById("bedroom"),
    document.getElementById("garage"),
];
let roomsNames = [
    "LivingRoom",
    "Kitchen",
    "Bedroom",
    "Garage",
];

/*
*
*   MQTT broker connection
*
*/
// connect to heroku broker
// let host = "iot-smart-home-broker.herokuapp.com/";
// let port = 80;

// connect to hive mqtt broker 
// let host = "broker.mqttdashboard.com";
// let port = 8000;

// connect to digital ocean mqtt broker 
let host = "46.101.2.154";
let port = 8888;

let mqtt = new Paho.MQTT.Client(host, port, "clientId");
let reconnectTimeout = 2000;
mqtt.onMessageArrived = onSensorMessageArrived;

function onConnect() {
    // once a connection has been made, make a subscription and send a message.
    console.log("Connected");
    // subscribe to movement sensor topic
    mqtt.subscribe("home/LivingRoom/movement", { onSuccess: subscribeSucessFcn });
    message = new Paho.MQTT.Message("Greetings from web client");
    message.destinationName = "home-listen";
    mqtt.send(message);
}
function MQTTconnect() {
    console.log("connecting to " + host + " " + port);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
    };
    mqtt.connect(options); //connect
}

function subscribeSucessFcn() {
    console.log("Subscribed successfully");
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

// called when a message arrives
function onSensorMessageArrived(message) {
    switchState[livingRoomNumber] = true;
    if (message.payloadString === "on") {
        document.getElementById("livingRoom").checked = true;
    }
    sendLightStateMessage(livingRoomNumber)
    pushNotification(livingRoomNumber);
    console.log("onSensorMessageArrived:" + message.payloadString);
}


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