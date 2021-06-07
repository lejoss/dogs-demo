import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	if (req.method === 'POST') {
		const prisma = new PrismaClient()
		const {
			name,
			age,
			breed,
			size,
			gender,
			userid
		} = req.body

		try {
			await prisma.dogs.create({
				data: {
					name,
					age: parseInt(age),
					breed,
					size,
					gender,
					active: false,
					lastseen: new Date(),
					userid
				}
			})
			await prisma.$disconnect()

			return res.status(201).json({ message: 'dog created' })
		} catch (error) {
			return res.status(500).json({ error: 'Error creating a Dog in prisma' })
		}

	} else {
		// TODO: Handle any other HTTP method
	}


}