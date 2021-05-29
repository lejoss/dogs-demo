
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	try {
		let dogs = await prisma.dog.findMany({
			where: {
				active: true
			}
		})

		await prisma.$disconnect()

		return res
			.status(200)
			.json(dogs)

	} catch (error) {
		return res.status(500).json({ error: 'Error trying to fetch dogs from prisma' })
	}
}