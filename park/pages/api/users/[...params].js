import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()

	// get user by endpoint
	if (req.method === 'GET' && req.query) {
		const { params: [endpoint] } = req.query
		try {
			const user = await prisma.users.findUnique({ where: { endpoint } })
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