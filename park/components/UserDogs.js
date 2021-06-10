import { Card, Row } from '.'
import styles from './UserDogs.module.css'
export default function UserDogs(props) {
	if (!props || !props.dogs) return
	return (
		<section>
			<Card variant="accent">
				<h1 className={styles.h1}>{props.title || 'mis perros'}</h1>
				<ul className={styles.ul}>
					{props.dogs.map((dog, i) => {
						if (i > 1) return
						return (
							<li className={styles.li} key={i}>
								<Row>
									<img style={{ maxHeight: 40, maxWidth: 40 }} src="pawn.svg" />
									<span> {dog.name}</span>
									{' - '}
									<span>{`${dog.age} años`}</span>
								</Row>
								<Row>
									<small>{dog.visits} visitas al parque</small>
								</Row>
							</li>
						)
					})}
				</ul>

			</Card>
		</section>
	)

}