import { useRouter } from 'next/router'
import { usePark } from '/utils/hooks'
import Title from '/components/Title'
import styles from './Park.module.css'

export default function Park(props) {
	const { dogs, error } = usePark()
	const router = useRouter()
	return (
		<div className={styles.container}>
			<Title>Parque Laureles</Title>
			<div className={styles.park}>
				<ul className={styles.ul}>
					{
						dogs
							? dogs.map((dog, i) => <li className={styles.li} key={i}>{dog.name}</li>)
							: null
					}
				</ul>

			</div>
			<button onClick={() => router.push('/menu')}>menu</button>
		</div>
	)
}