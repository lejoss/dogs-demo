import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()

	if (req.method === 'GET' && req.query) {
		const { params: [, , id] } = req.query
		try {
			const dogs = await prisma.dog.findMany()
			await prisma.$disconnect()

			if (dogs && dogs.length) {
				const userDogs = dogs && dogs.length && dogs.filter(dog => dog.userid !== id)
				res.status(200).json({ dogs: userDogs })

			} else {
				res.status(404).json({ message: `User don't have dogs.` })
			}
		} catch (error) {
			res.status(500).json({ error: 'Error fetching User Dogs in prisma' })
		}
	}

	// update user's dogs
	if (req.method === 'PATCH') {
		const { params: [, , , id] } = req.query
		try {
			const dogs = await prisma.dog.updateMany({
				where: {
					userid: parseInt(id)
				},
				data: {
					active: true,
				},
			})

			await prisma.$disconnect()

			if (dogs) {
				res.status(200).json({ message: 'dog updated' })
			} else {
				// res.status(400).json({ message: 'dog updated' })
			}

		} catch (error) {
			res.status(500).json({ error: 'Error trying to update dog in prisma' })
		}
	}
}