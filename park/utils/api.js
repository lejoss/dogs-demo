import { client } from '/utils/client'

function createDog(dog) {
	return client('dogs/create', { data: dog })
}

function fetchDogsOnline() {
	return client('dogs')
}

function fetchUserByEndpoint(endpoint) {
	return client(`users/${endpoint}`)
}

function fetchDogsFromUser(user) {
	return client(`dogs/user/${user}`)
}

function notificateUsersOfNewDogsInPark() {
	return client('broadcast', { method: 'POST' })
}

function subscribeUserToPushNotifications(subscription) {
	console.log('api', subscription)
	return client(`subscribe`, { data: subscription })
}

function updateDogsFromUser(user, active) {
	return client(`dogs/update/user/${user}`, { method: 'PATCH', data: { active } })
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