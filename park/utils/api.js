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

function fetchDogsByUser(user) {
	return client('dogs/owner', { data: { user } })
}

function subscribeUserToPushNotifications(subscription) {
	return client('users/subscription', { data: subscription })
}

// updates all dogs from one user
// TODO: fix semantics
function updateUserDogs(user) {
	return client('dogs/update', { data: { user }, method: 'PATCH' })
}

export {
	createDog,
	fetchOnlineDogs,
	fetchUser,
	fetchDogsByUser,
	subscribeUserToPushNotifications,
	updateUserDogs,
}