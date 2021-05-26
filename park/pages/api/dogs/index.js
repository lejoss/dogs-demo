
// import { dogs } from '../../../data'
import { PrismaClient } from '@prisma/client'
export default async function (req, res) {
	const prisma = new PrismaClient()
	let dogs = await prisma.dog.findMany()

	dogs = dogs && dogs.map(dog => ({ ...dog, id: dog.id.toString() }))
	console.log('DATA FROM PRISMA BITCHES', dogs)
	return res
		.status(200)
		.json(dogs)
}