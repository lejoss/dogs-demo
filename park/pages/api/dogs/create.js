import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
	if (req.method === 'POST') {
		const {
			name,
			age,
			breed,
			size,
			gender,
			userId
		} = req.body

		const prisma = new PrismaClient()
		try {
			await prisma.user.create({
				data: {
					name,
					age,
					breed,
					size,
					gender,
					userId
				},
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