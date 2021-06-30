import { Card, Row } from '.'
import styles from './UserDogs.module.css'
export default function UserDogs(props) {
	if (!props || !props.dogs) return
	return (
		<Card variant="accent">
			<div className={styles.content} >
				<h3 className={styles.h1}><span style={{ fontSize: '2rem' }}>🐶</span> &nbsp; {props.title || 'mi mascota'}</h3>
				<ul className={styles.ul}>
					{props.dogs.map((dog, i) => {
						if (i > 1) return
						return (
							<li className={styles.li} key={i}>
								<Row>
									{/* <img style={{ maxHeight: 40, maxWidth: 40 }} src="pawn.svg" /> */}
									<span> {dog.name}</span>
									{' - '}
									<span>{dog.breed}</span>
								</Row>
								<div style={{ marginBottom: '.5em' }}/>
								{/* <Row>
									<small>{dog.visits} visitas al parque</small>
								</Row> */}
							</li>
						)
					})}
				</ul>
			</div>

		</Card>
	)

}