import { client } from '/utils/client'


function createDog(dog) {
	return client('dogs/create', { data: dog })
}

function fetchOnlineDogs() {
	return client('dogs')
}

function fetchUserDogs(user) {
	return client('dogs/owner', { data: { user } })
}

function subscribeUserToPushNotifications(subscription) {
	return client('subscription', { data: subscription })
}

function updateDog(user) {
	return client('dogs/update', { data: { user }, method: 'PATCH' })
}

export {
	createDog,
	fetchOnlineDogs,
	fetchUserDogs,
	subscribeUserToPushNotifications,
	updateDog,
}