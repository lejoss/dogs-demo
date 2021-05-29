import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'PATCH') {
		const { user } = req.body

		try {
			await prisma.dog.update({
				where: {
					user
				},
				data: {
					active: true,
				},
			})

			await prisma.$disconnect()

			res.status(200).json({ message: 'dog updated' })
		} catch (error) {
			res.status(500).json({ error: 'Error trying to update dog in prisma' })
		}

	} else {
		// Handle any other HTTP method
	}
}
