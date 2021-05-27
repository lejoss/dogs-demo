import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	if (req.method === 'POST') {
		const { user } = req.body

		const prisma = new PrismaClient()
		try {
			await prisma.user.create({
				data: {
					user,
					lastseen: new Date(),
					status: true
				}
			})
			await prisma.$disconnect()

			// TODO: res

		} catch (error) {
			// TODO: handle error

		}

	} else {
		// TODO: Handle any other HTTP method
	}


}