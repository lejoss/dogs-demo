import webpush from '/webpush'
import { PrismaClient } from '@prisma/client'
import { hashEndpoint } from '/utils'


const payload = JSON.stringify({
	title: "🌳 PARQUE LAURELES 🌳 ", 
	message: "🐶 Hola hay un nuevo perro en el parque. \n 🐾  Miralo aqui: 👉  https://laureles.vercel.app/park"
})

const options = {
	// gcmAPIKey: '',
	TTL: 60,
}

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'POST' && req.body) {
		const { userid: id } = req.body
		let subscriptions = await prisma.users.findMany()

		if (subscriptions && subscriptions.length) {
			subscriptions = subscriptions.filter(userSub => userSub.id !== id).map(sub => JSON.parse(sub.subscription))

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
						await prisma.users.delete({ where: { id }})
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
