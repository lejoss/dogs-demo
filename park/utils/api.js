

async function subscribeUserToPushNotifications(subscription) {
	// TODO: import client
	return await fetch('/api/subscription', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

async function createDog(dog) {
	// return await fetch('/api/dogs/create', {
	// 	method: 'POST',
	// 	body: dog,
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// })

	console.log('create dog api')

}

export {
	subscribeUserToPushNotifications,
	createDog
}