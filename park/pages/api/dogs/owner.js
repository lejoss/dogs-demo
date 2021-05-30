
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	if (req.method === 'POST') {
		const { user: userid } = req.body
		try {
			let ownerDogs = await prisma.dog.findMany({ where: { userid } })

			await prisma.$disconnect()
			return res
				.status(200)
				.json(ownerDogs)

		} catch (error) {
			return res.status(500).json({ error: 'Error fetching User Dogs in prisma' })
		}

	}
}