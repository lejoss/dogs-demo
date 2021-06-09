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
            //badge: '/public/pawn.png',
            //icon: '/public/grass.svg'
        })
    )
});
