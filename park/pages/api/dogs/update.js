import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'PATCH') {
		const { user: userid } = req.body
		try {
			const dog = await prisma.dog.update({
				where: { userid },
				data: {
					active: true,
				},
			})

			await prisma.$disconnect()
			return res.status(200).json({ message: 'dog updated', data: dog })

		} catch (error) {
			return res.status(500).json({ error: 'Error trying to update dog in prisma' })
		}

	} else {
		// Handle any other HTTP method
	}
}
