
import { dogs } from '../../../data'
export default function (req, res) {
	return res
		.status(200)
		.json(dogs)
}