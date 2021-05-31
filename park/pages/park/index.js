import { useRouter } from 'next/router'
import { usePark } from '/utils/hooks'
import { Button, Title } from '/components'
import styles from './Park.module.css'

const Card = ({ children }) => {
	return <div className={styles.card}>{children}</div>
}

const CardAvatar = ({ children }) => {
	return <div className={styles.card__avatar}>{children}</div>
}

const CardContent = ({ children }) => {
	return <div className={styles.card__content}>{children}</div>
}

const CardTitle = ({ children }) => {
	return (
		<div className={styles.card__title}>
			{children}
		</div>
	)
}

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
							? dogs.map((dog, i) => {
								return (
									<li className={styles.li} key={i}>
										<Card>
											<CardAvatar>
												<img src="pawn.png" alt="" />
											</CardAvatar>
											<CardContent>
												<CardTitle>
													<span>{dog.name}</span>
												</CardTitle>
												<div>
													<span>{dog.gender}</span>
													{' '}
													<span>{dog.age}</span>
													{' '} {'años'}
												</div>
												<div>
													<span>Raza</span>
													{' '}
													<span>{dog.breed}</span>
												</div>
											</CardContent>
										</Card>
									</li>
								)
							})
							: null
					}
					<div style={{ textAlign: 'center', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '0 2em' }}>
						{dogs && !dogs.length && <h3>No hay perros activos en el parque. Te enviaremos una notificacion cuando un perro ingrese al parque.</h3>}
					</div>
				</ul>

			</div>
			<Button onClick={() => router.push('/')}>Regresar</Button>
		</div>
	)
}