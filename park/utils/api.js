import { client } from '/utils/client'

function subscribeUserToPushNotifications(subscription) {
	return client('subscription', { data: subscription })
}

function createDog(dog) {
	return client('dogs/create', { data: dog })
}

function fetchOnlineDogs() {
	return client('dogs')
}

function registerVisit(visit) {
	return client('visit/create', { data: visit })
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