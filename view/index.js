const button = document.querySelector("input");

button.addEventListener('click', () => {

    if (!window.Notification) return;
    try {
        Notification.requestPermission()
            .then(showNotification)
    } catch (error) {
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


