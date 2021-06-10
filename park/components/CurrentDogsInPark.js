import { Card } from './'
import Link from 'next/link'
import styles from './CurrentDogsInPark.module.css'
export default function CurrentDogsInPark(props) {
	return (
		<div>
			{props.count > 0
				? (<Card>
					<h1>{`${props.count} Perro en el parque`}</h1>
					<br />
					<Link href="/park">ver parque</Link>
				</Card>)
				: (
					<Card variant="dark">
						<h1>No hay perros en el parque</h1>
					</Card>)
			}
		</div>

	)

}