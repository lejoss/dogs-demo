import { dogs } from '../../../data'

export default function dogHandler({ query: { id } }, res) {
	const filtered = dogs.filter((p) => p.id === id)

	if (filtered.length > 0) {
		// await prisma.$disconnect()
		res.status(200).json(filtered[0])
	} else {
		res.status(404).json({ message: `Dog with id: ${id} not found.` })
	}
}