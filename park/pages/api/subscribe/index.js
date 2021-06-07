import { hashEndpoint } from '/utils'
import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	const prisma = new PrismaClient()
	if (req.method === 'POST') {
		const pushSubscription = req.body;

		if (!pushSubscription.endpoint) {
			// not valid subscription
			res.status(400).json({ message: 'subscription must have an endpoint' })
		}



		try {
			const user = await prisma.users.findFirst({
				where: { endpoint: JSON.stringify(pushSubscription.endpoint) },
			})

			if (user) {
				return res.status(200).json({ user: id })

			} else {
				const userSubscription = await prisma.users.create({
					data: {
						subscription: JSON.stringify(pushSubscription) || null,
						endpoint: hashEndpoint(pushSubscription.endpoint),
					},
				})
				await prisma.$disconnect()

				const { id } = userSubscription
				return res.status(200).json({ user: id })
			}

		} catch (error) {
			res.status(500).json({ error: 'Error trying to subscribe to push notifications' })
		}
	}
	return res.status(404).json({ message: 'resource not found' })

}
