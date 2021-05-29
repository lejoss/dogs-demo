
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()

	if (req.method === 'GET') {
		try {
			let users = await prisma.user.findMany()
			await prisma.$disconnect()

			return res
				.status(200)
				.json(users)

		} catch (error) {
			return res.status(500).json({ error: 'Error trying to fetch users from prisma' })
		}
	} else if (req.method === 'POST') {
		const { user: endpoint } = req.body

		try {
			const user = await prisma.user.findUnique({ where: { endpoint } })
			await prisma.$disconnect()

			if (user) {
				const { id } = user
				return res.status(200).json({ user: id })

			} else {
				return res.status(404).json({ message: `User with id: ${user.id} not found.` })
			}

		} catch (error) {
			return res.status(500).json({ error: `Error fetching User with in prisma` })
		}

	} else {

	}
}