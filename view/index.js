const button = document.querySelector("input");

button.addEventListener('click', () => {

    if (!window.Notification) return;

    // Notification
    //     .requestPermission()
    //     .then(showNotification)


    try {
        Notification.requestPermission()
            .then(showNotification)
    } catch (error) {
        // Safari doesn't return a promise for requestPermissions and it                                                                                                                                       
        // throws a TypeError. It takes a callback as the first argument                                                                                                                                       
        // instead.
        if (error instanceof TypeError) {
            Notification.requestPermission(showNotification);
        } else {
            throw error;
        }
    }
});


function showNotification(permission) {
    if (permission !== 'granted')
        return;

    let notification = new Notification('Smart Home app', {
        body: "Living Room light is ON",
    });
}


