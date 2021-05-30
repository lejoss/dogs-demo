import { useRouter } from 'next/router'
import { usePark } from '/utils/hooks'
import styles from './Park.module.css'

export default function Park(props) {
	// const { dogs, error } = usePark()
	const router = useRouter()
	return (
		<div className={styles.container}>
			<h1>Parque Laureles</h1>
			<div className={styles.park}>
				
			</div>
			<button onClick={() => router.push('/menu')}>menu</button>
		</div>
	)
}