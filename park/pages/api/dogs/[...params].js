import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()

	if (req.method === 'GET' && req.query) {
		// params -> dogs/user/userId
		const { params: [, , id] } = req.query
		try {
			const dogs = await prisma.dogs.findMany()
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

	// update dogs owned by user
	if (req.method === 'PATCH') {
		// params -> dogs/update/user/userId
		const { params: [, , id] } = req.query
		const { active } = req.body

		try {
			const update = await prisma.dogs.updateMany({
				where: {
					userid: parseInt(id)
				},
				data: { active },
			})

			const updatedDogs = await prisma.dogs.findMany({
				where: {
					userid: parseInt(id)
				}
			})

			await prisma.$disconnect()

			if (update && updatedDogs) {
				res.status(200).json({ message: 'dog updated', data: updatedDogs })
			} else {
				// res.status(400).json({ message: 'dog updated' })
			}

		} catch (error) {
			res.status(500).json({ error: 'Error trying to update dog in prisma' })
		}
	}
}