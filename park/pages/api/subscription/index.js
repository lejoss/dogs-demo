import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	if (req.method === 'POST') {
		const pushSubscription = req.body;

		const prisma = new PrismaClient()
		const user = await prisma.user.findFirst({
			where: { endpoint: JSON.stringify(pushSubscription.endpoint) },
		})

		if (!user) {
			await prisma.user.create({
				data: {
					subscription: JSON.stringify(pushSubscription) || null,
					endpoint: pushSubscription.endpoint,
				},
			})
		} else {
			console.log('user already subscribed')
			// esta en visita ?

			// TODO: res status -> ??
		}

		res.status(200).json();
	}
}
