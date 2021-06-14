import { client } from '/utils/client'

function createDog(dog) {
	return client('dogs/create', { data: dog })
}

function fetchDogs() {
	return client('dogs')
}

function fetchUserByEndpoint(endpoint) {
	return client(`users/${endpoint}`)
}

function notificateUsersOfNewDogsInPark(userid) {
	return client('broadcast', { data: { userid } ,method: 'POST' })
}

function subscribeUserToPushNotifications(subscription) {
	return client(`subscribe`, { data: subscription })
}

function updateDogsFromUser(user, active) {
	return client(`dogs/update/user/${user}`, { method: 'PATCH', data: { active } })
}

export {
	notificateUsersOfNewDogsInPark,
	createDog,
	fetchDogs,
	fetchUserByEndpoint,
	subscribeUserToPushNotifications,
	updateDogsFromUser,
}