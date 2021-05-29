import { usePark } from '/utils/hooks'

export default function Park(props) {
	const { dogs, error } = usePark()
	console.log('park', dogs)
	return <h1>Parque Laureles</h1>
}