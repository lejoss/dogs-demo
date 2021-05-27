

async function subscribeUserToPushNotifications(subscription) {
	// TODO: import client
	return await fetch("/api/subscription", {
		method: "POST",
		body: JSON.stringify(subscription),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export {
	subscribeUserToPushNotifications
}