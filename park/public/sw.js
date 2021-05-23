console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('Notification Received');
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://img-premium.flaticon.com/png/512/12/12638.png?token=exp=1621803507~hmac=18916eb0fa736e637f9af26b154c9c15'
    });
});

self.addEventListener("install", function (event) {
    console.log("Hello world from the Service Worker 🤙");
});