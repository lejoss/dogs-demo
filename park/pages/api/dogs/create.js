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
			const data = await prisma.dogs.create({
				data: {
					name,
					age: parseInt(age),
					breed,
					size,
					gender,
					active: false,
					lastseen: new Date(),
					visits: 0,
					userid
				}
			})
			await prisma.$disconnect()

			return res.status(201).json({ message: 'dog created', data })
		} catch (error) {
			return res.status(500).json({ error: 'Error creating a Dog in prisma' })
		}

	} else {
		// TODO: Handle any other HTTP method
	}


}