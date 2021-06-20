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
});

self.addEventListener('notificationclick', function (event) {
    event.notification.onclick = function (event) {
        event.preventDefault(); // Previene al buscador de mover el foco a la pestaña del Notification
        window.open('https://laureles.vercel.app', '_blank');
    }
})
