const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BG5Qz4QgHdW7-WI14901844LxYNhfqmfNBQBu32zVyCHqeCNm0cVLospzUqkYxC3UYbw4jKrPA0stvgb7m6jqgE",
    "privateKey": "Yls4pwdJL6VEPAjjDJS7zUkRuB5GXT0ulpqeunoyjlQ"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dZBs8J9vtDE:APA91bH0E47pffrGP_PsRaKKS7VHVBOuczx0uXOcJrkb377wE0Pl0lvoe6aRf9BfwqogfJURGQT6L0M05ohPcC-Em0xwwqeMoQ1-6KLwwHE2kn5BU3GZcDW-2XUGILD84Pi9oyvDxRkN",
    "keys": {
        "p256dh": "BIw/kL/s7uWZzAlSntTP4p1fjiUUDYAjAiObDHmWuKElkqI2AA5fwcSyNAjnSZPX/wXgRQ6zfbSFZeRJRQQlCb4=",
        "auth": "aGLnQSYJ+PZweNK1mgA/LA=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '755845978108',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);