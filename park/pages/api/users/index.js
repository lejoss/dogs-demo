
import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	if (req.method === 'GET') {
		try {
			let users = await prisma.user.findMany()
			await prisma.$disconnect()

			if (users && users.length) {
				res.status(200).json(users)
			} else {
				res.status(404).json({ message: 'No users found' })
			}

		} catch (error) {
			res.status(500).json({ error: 'Error trying to fetch users from prisma' })
		}
	} else {

	}
}