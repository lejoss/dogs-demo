import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	if (req.method === 'POST') {
		const pushSubscription = req.body;

		const prisma = new PrismaClient()
		const user = await prisma.user.findFirst({
			where: { subscription: JSON.stringify(req.body) },
		})

		if (!user) {
			await prisma.user.create({
				data: {
					subscription: JSON.stringify(pushSubscription) || null,
				},
			})
		} else {
			console.log('user already subscribed')
			// TODO: res status -> ??
		}

		res.status(200).json();
	}
}
