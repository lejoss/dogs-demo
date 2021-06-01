import { client } from '/utils/client'

function notificateUsersOfNewDogsInPark() {
	return client('broadcast', { method: 'POST' })
}

function createDog(dog) {
	return client('dogs/create', { data: dog })
}

function fetchDogsOnline() {
	return client('dogs')
}

function fetchUserByEndpoint(endpoint) {
	return client(`users/${endpoint}`)
}

// TODO: improve semantics
// dogs/user/id
function fetchDogsFromUser(user) {
	return client(`users/${user}/dogs`)
}

function subscribeUserToPushNotifications(subscription) {
	return client(`subscribe`, { data: subscription })
}

function updateDogsFromUser(user) {
	return client(`dogs/${user}/update`, { method: 'PATCH' })
}

export {
	notificateUsersOfNewDogsInPark,
	createDog,
	fetchDogsOnline,
	fetchUserByEndpoint,
	fetchDogsFromUser,
	subscribeUserToPushNotifications,
	updateDogsFromUser,
}