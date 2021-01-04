// const switchBtn = document.querySelector("input");
const switchBtn = [
    document.getElementById("livingRoom"),
    document.getElementById("kitchen"),
    document.getElementById("bedroom"),
    document.getElementById("garage"),
];

let state = [false, false, false, false];
let roomsNames = [
    "Living Room",
    "Kitchen",
    "Bedroom",
    "Garage",
]

switchBtn[0].addEventListener('click', () => {
    if (state[0])
        state[0] = false;
    else
        state[0] = true;

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
    if (state[1])
        state[1] = false;
    else
        state[1] = true;

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
    if (state[2])
        state[2] = false;
    else
        state[2] = true;

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
    if (state[3])
        state[3] = false;
    else
        state[3] = true;

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

    if (state[roomNumber]) {
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
