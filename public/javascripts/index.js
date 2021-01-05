const switchBtn = [
    document.getElementById("livingRoom"),
    document.getElementById("kitchen"),
    document.getElementById("bedroom"),
    document.getElementById("garage"),
];
let switchState = [false, false, false, false];
let roomsNames = [
    "Living Room",
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
*   MQTT Event handelrs
*
*/
let mqtt;
let reconnectTimeout = 2000;
// connect to 
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
    switchState[livingRoomNumber] = !switchState[livingRoomNumber];

    if (switchState[livingRoomNumber]) {
        message = new Paho.MQTT.Message("on");
    }
    else {
        message = new Paho.MQTT.Message("off");
    }
    message.destinationName = "home/livingRoom/lighting";
    mqtt.send(message);

    pushNotification(livingRoomNumber);
});

switchBtn[kitchenNumber].addEventListener('click', () => {
    if (switchState[kitchenNumber])
        switchState[kitchenNumber] = false;
    else
        switchState[kitchenNumber] = true;

    pushNotification(kitchenNumber);
});

switchBtn[bedroomNumber].addEventListener('click', () => {
    if (switchState[bedroomNumber])
        switchState[bedroomNumber] = false;
    else
        switchState[bedroomNumber] = true;

    pushNotification(bedroomNumber);
});

switchBtn[garageNumber].addEventListener('click', () => {
    if (switchState[garageNumber])
        switchState[garageNumber] = false;
    else
        switchState[garageNumber] = true;

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