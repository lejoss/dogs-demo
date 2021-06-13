
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	if (req.method === 'GET') {
		try {
			const dogs = await prisma.dogs.findMany()
			await prisma.$disconnect()

			if (dogs && dogs.length) {
				res.status(200).json(dogs)
			} else {
				res.status(404).json({ message: 'Dogs not found' })
			}
		} catch (error) {
			res.status(500).json({ error: 'Error trying to fetch dogs from prisma' })
		}
	}
}