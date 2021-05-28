
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	try {
		let dogs = await prisma.dog.findMany()
		dogs = dogs.length && dogs.map(dog => ({ ...dog, id: dog.id.toString() }))

		return res
			.status(200)
			.json(dogs)

	} catch (error) {
		return res.status(500).json({ error })
	}
}