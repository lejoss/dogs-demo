import { client } from '/utils/client'

function subscribeUserToPushNotifications(subscription) {
	return client('subscription', { data: subscription })
}

function createDog(dog) {
	// TODO: need user's endpoint
	return client('dogs/create', { data: dog })
}

function fetchOnlineDogs() {
	return client('dogs')
}

function registerVisit() {
	// para registrar una visita
	// el usuario debe tener al menos
	// una mascota
	return
}

function fetchUserDogs() {
	return
}

export {
	subscribeUserToPushNotifications,
	createDog,
	registerVisit,
	fetchOnlineDogs,
	fetchUserDogs,
}