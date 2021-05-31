import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	const { params: [id, requestedResource] } = req.query

	// get user dogs
	if (req.method === 'GET' && requestedResource === 'dogs') {
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

	// get user by endpoint
	if (req.method === 'GET' && id && !requestedResource) {
		try {

			const user = await prisma.user.findUnique({ where: { endpoint: id } })
			await prisma.$disconnect()

			if (user) {
				const { id } = user
				res.status(200).json({ user: id })

			} else {
				res.status(404).json({ message: `User not found.` })
			}

		} catch (error) {
			res.status(500).json({ error: `Error fetching User in prisma` })
		}

	}




}