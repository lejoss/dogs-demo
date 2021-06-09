import Link from 'next/link'
import styles from './CurrentDogsInPark.module.css'
export default function CurrentDogsInPark(props) {
	return (
		<div>
			{props.count > 0
				? (<section className={`${styles.card} ${styles.light}`}>
					<h1>{`${props.count} Perro en el parque`}</h1>
					<br />
					<Link href="/park">ver parque</Link>
				</section>)
				: (
					<section className={`${styles.card} ${styles.dark}`}>
						<h1>No hay perros en el parque</h1>
					</section>)
			}
		</div>

	)

}