import webpush from '/webpush'
import { PrismaClient } from '@prisma/client'
import { hashEndpoint } from '/utils'


const payload = JSON.stringify({
	title: "Parque Laureles",
	message: "Hola hay un nuevo perro en el parque"
})

const options = {
	// gcmAPIKey: '',
	TTL: 60,
}

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'POST') {
		let subscriptions = await prisma.users.findMany()


		if (subscriptions && subscriptions.length) {
			subscriptions = subscriptions.map(sub => JSON.parse(sub.subscription))

			try {
				let promiseChain = Promise.resolve()

				for (let i = 0; i < subscriptions.length; i++) {
					const subscription = subscriptions[i]
					promiseChain = promiseChain.then(() => {
						return webpush.sendNotification(subscription, payload, options)
					})
				}

				return promiseChain.then(
					() => {
						res.setHeader('Content-Type', 'application/json');
						res.status(201).json({ message: 'success' })
					}
				).catch(async err => {
					if (err.statusCode === 410) {
						const endpointHash = hashEndpoint(err.endpoint)
						await prisma.users.delete({
							where: { endpoint: endpointHash }
						})
						await prisma.$disconnect()
						res.status(200).json({ message: 'success' })
					} else {
						res.status(404).json({ message: 'error with webpush notification' })
					}

				})

			} catch (error) {
				res.status(500).json({ message: 'Error trying to broadcast notifications', data: error })
			}
		} else {
			res.status(404).json({ message: 'there are no user subscriptions' })
		}
	}
	res.status(404).json('message: resource not found')
}
