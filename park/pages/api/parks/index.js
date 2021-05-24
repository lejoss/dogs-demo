import { PrismaClient } from '@prisma/client'
// import { parks } from '../../../data'


export default async function (req, res) {
	const prisma = new PrismaClient()
	let parks = await prisma.park.findMany()
	parks = parks && parks.map(park => ({ ...park, id: park.id.toString() }))

	console.log('DATA FROM PRISMA BITCHES 2', parks)

	return res
		.status(200)
		.json(parks)
}