
// import { dogs } from '../../../data'
import { PrismaClient } from '@prisma/client'
export default async function (req, res) {
	const prisma = new PrismaClient()
	const dogs = await prisma.dog.findMany()
	console.log('DATA FROM PRISMA BITCHES', dogs)
	return res
		.status(200)
		.json(dogs)
}