import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'POST') {
		const pushSubscription = req.body;

		try {
			const user = await prisma.user.findFirst({
				where: { endpoint: JSON.stringify(pushSubscription.endpoint) },
			})

			if (user) {
				const { id } = user
				res.status(200).json({ id })
			} else {
				const userSubscribed = await prisma.user.create({
					data: {
						subscription: JSON.stringify(pushSubscription) || null,
						endpoint: pushSubscription.endpoint,
					},
				})
				await prisma.$disconnect()
				const { id } = userSubscribed
				res.status(200).json({ id })
			}

		} catch (error) {
			res.status(500).json({ error: 'Error trying to subscribe to push notifications' })
		}
	}
}
