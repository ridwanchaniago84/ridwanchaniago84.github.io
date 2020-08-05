const registerServiceWorker = () => {
    return navigator.serviceWorker
        .register("sw.js")
        .then(registration => {
            return registration;
        })
}

const requestPermission = () => {
    Notification.requestPermission().then(result => {

        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(registration => {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        "BG5Qz4QgHdW7-WI14901844LxYNhfqmfNBQBu32zVyCHqeCNm0cVLospzUqkYxC3UYbw4jKrPA0stvgb7m6jqgE"
                    )
                }).then(subscribe => {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ',
                        subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ',
                        btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh'))
                        )));
                    console.log('Berhasil melakukan subscribe dengan auth key: ',
                        btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function (e) {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }

    });
}

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

registerServiceWorker();
requestPermission();

const Notif = (title, Pesan) => {
    const options = {
        body: Pesan,
        icon: "/img/logo.png",
        badge: "/img/logo.png",
    };
    if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, options);
        });
    }
}