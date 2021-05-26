import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'POST') {
		const pushSubscripton = req.body;

		const user = await prisma.user.findFirst({
			where: { subscription: JSON.stringify(req.body) },
		})

		if (!user) {
			await prisma.user.create({
				data: {
					subscription: JSON.stringify(pushSubscripton) || null,
				},
			})
		} else {
			console.log('user already subscribed')
			// res status -> ??
		}

		res.status(200).json();
	}
}
