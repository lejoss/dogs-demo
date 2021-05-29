import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	const prisma = new PrismaClient()

	if (req.method === 'PATCH') {
		const { user } = req.body

		try {
			// const updatedDogs = await prisma.dog.update({
			// 	where: {
			// 		id: 1
			// 	},
			// 	data: {
			// 		active: true,
			// 	},
			// })

			// console.log(':::: UPDATE 2 :::::', userDogs)

			// await prisma.$disconnect()

			// res.status(200).json({ message: 'dog updated' })
		} catch (error) {
			res.status(500).json({ error: 'Error trying to update dog in prisma' })
		}

	} else {
		// Handle any other HTTP method
	}
}
