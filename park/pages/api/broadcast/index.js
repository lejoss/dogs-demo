import webpush from '/webpush'
import { PrismaClient } from '@prisma/client'


const payload = JSON.stringify({
	title: "Park Notification",
	message: "Hola estoy en el parque"
})

const options = {
	// gcmAPIKey: '',
	TTL: 60,
}

export default async (req, res) => {
	if (req.method === 'POST') {
		const prisma = new PrismaClient()
		let subscribedUsers = await prisma.user.findMany()

		if (subscribedUsers.length) {
			subscribedUsers = subscribedUsers.map(user => {
				const subscription = user.subscription.replace(/'/g, '')
				return {
					...user,
					subscription: JSON.parse(subscription)
				}
			})

			try {
				const notificationsPromises = subscribedUsers.map(({ subscription }) => {
					return webpush.sendNotification(subscription, payload, options)
				})

				Promise.all(notificationsPromises)
				// TODO: res ??

			} catch (error) {
				// TODO: console.log(':::: error ::::', error);
			}
		}

		// TODO: res ??


	}


	res.status(200).json();


}
