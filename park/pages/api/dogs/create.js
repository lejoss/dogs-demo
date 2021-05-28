import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	if (req.method === 'POST') {
		const {
			name,
			age,
			breed,
			size,
			gender,
			user
		} = req.body

		const prisma = new PrismaClient()
		try {
			await prisma.dog.create({
				data: {
					name,
					age: parseInt(age),
					breed,
					size,
					gender,
					user
				},
			})
			await prisma.$disconnect()

			res.status(200).json({ message: 'dog created' })
		} catch (error) {
			// TODO: handle error
			res.status(500).json({ error })

		}

	} else {
		// TODO: Handle any other HTTP method
	}


}