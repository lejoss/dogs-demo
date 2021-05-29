
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	if (req.method === 'POST') {
		const { user } = req.body
		try {
			let ownerDogs = await prisma.dog.findMany({ where: { user } })
			ownerDogs = ownerDogs.length && ownerDogs.map(dog => ({ ...dog, id: dog.id.toString() }))
	
			await prisma.$disconnect()
	
			return res
				.status(200)
				.json(ownerDogs)
	
		} catch (error) {
			return res.status(500).json({ error })
		}

	}
}