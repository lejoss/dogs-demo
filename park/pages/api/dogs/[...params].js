import { PrismaClient } from '@prisma/client'

export default async function (req, res) {
	const prisma = new PrismaClient()
	const { params: [id, action] } = req.query

	// update user's dogs
	if (req.method === 'PATCH' && id && action === 'update') {
		try {
			console.log('userid', id)
			const dogs = await prisma.dog.updateMany({
				where: {
					userid: parseInt(id)
				},
				data: {
					active: true,
				},
			})

			await prisma.$disconnect()
			return res.status(200).json({ message: 'dog updated', data: dogs })

		} catch (error) {
			return res.status(500).json({ error: 'Error trying to update dog in prisma' })
		}
	}
}