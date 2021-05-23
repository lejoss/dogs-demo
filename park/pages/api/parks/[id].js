import { parks } from '../../../data'
export default function parkHandler({ query: { id } }, res) {
	const filtered = parks.filter((p) => p.id === id)

	if (filtered.length > 0) {
		res.status(200).json(filtered[0])
	} else {
		res.status(404).json({ message: `Park with id: ${id} not found.` })
	}
}