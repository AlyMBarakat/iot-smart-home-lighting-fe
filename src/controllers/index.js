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
]

/*
*
*
*   MQTT Event handelrs
*
*/
var mqtt;
var reconnectTimeout = 2000;
var host = "iot-smart-home-broker.herokuapp.com/"; //change this
var port = 80;

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.

    console.log("Connected ");
    // mqtt.subscribe("sensor1");
    message = new Paho.MQTT.Message("Hello World");
    message.destinationName = "test/MQTTclient/isWorking";
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
*
*   Switch buttons handlers
*
*/
switchBtn[0].addEventListener('click', () => {
    if (switchState[0])
        switchState[0] = false;
    else
        switchState[0] = true;

    if (!window.Notification) return;
    try {
        Notification.requestPermission()
            .then(permission => showNotification(permission, 0))
    } catch (error) {
        if (error instanceof TypeError) {
            Notification.requestPermission(permission => showNotification(permission, 0));
        } else {
            throw error;
        }
    }
});

switchBtn[1].addEventListener('click', () => {
    if (switchState[1])
        switchState[1] = false;
    else
        switchState[1] = true;

    if (!window.Notification) return;
    try {
        Notification.requestPermission()
            .then(permission => showNotification(permission, 1))
    } catch (error) {
        if (error instanceof TypeError) {
            Notification.requestPermission(permission => showNotification(permission, 1));
        } else {
            throw error;
        }
    }
});

switchBtn[2].addEventListener('click', () => {
    if (switchState[2])
        switchState[2] = false;
    else
        switchState[2] = true;

    if (!window.Notification) return;
    try {
        Notification.requestPermission()
            .then(permission => showNotification(permission, 2))
    } catch (error) {
        if (error instanceof TypeError) {
            Notification.requestPermission(permission => showNotification(permission, 2));
        } else {
            throw error;
        }
    }
});

switchBtn[3].addEventListener('click', () => {
    if (switchState[3])
        switchState[3] = false;
    else
        switchState[3] = true;

    if (!window.Notification) return;
    try {
        Notification.requestPermission()
            .then(permission => showNotification(permission, 3))
    } catch (error) {
        if (error instanceof TypeError) {
            Notification.requestPermission(permission => showNotification(permission, 3));
        } else {
            throw error;
        }
    }
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
