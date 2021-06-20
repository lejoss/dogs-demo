self.addEventListener('install', event => {
    console.log('Worker installed');
});

self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Notification Received', data);


    // const options = {
    //     body: '',
    //     icon: '',
    //     vibrate: [],
    //     allow us to identify notification
    //     data: { primaryKey: 1 }
    // }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            // badge: '🐾',
            //icon: '/public/grass.svg'
        })
    )
})

self.addEventListener('notificationclick', function (event) {
    let url = 'https://laureles.vercel.app'
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    )
})
