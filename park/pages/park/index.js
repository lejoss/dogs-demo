import { useRouter } from 'next/router'
import { usePark } from '/utils/hooks'

export default function Park(props) {
	// const { dogs, error } = usePark()
	const router = useRouter()
	return (
		<div>
			<h1>Parque Laureles</h1>
			<button onClick={() => router.push('/menu')}>menu</button>
		</div>
		)
}