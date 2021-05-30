
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	if (req.method === 'POST') {
		const { user: userid } = req.body
		try {
			const dogs = await prisma.dog.findMany()
			await prisma.$disconnect()
			const userDogs = dogs && dogs.length && dogs.filter(dog => dog.userid !== userid)
			return res
				.status(200)
				.json(userDogs)

		} catch (error) {
			return res.status(500).json({ error: 'Error fetching User Dogs in prisma' })
		}

	}
}