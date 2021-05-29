import { client } from '/utils/client'


function createDog(dog) {
	return client('dogs/create', { data: dog })
}

function fetchOnlineDogs() {
	return client('dogs')
}

function fetchUser(user) {
	return client('users', { data: { user } })
}

function fetchUserDogs(user) {
	return client('dogs/owner', { data: { user } })
}

function subscribeUserToPushNotifications(subscription) {
	return client('users/subscription', { data: subscription })
}

function updateDog(user) {
	return client('dogs/update', { data: { user }, method: 'PATCH' })
}

export {
	createDog,
	fetchOnlineDogs,
	fetchUser,
	fetchUserDogs,
	subscribeUserToPushNotifications,
	updateDog,
}