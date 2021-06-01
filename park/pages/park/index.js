import { useRouter } from 'next/router'
import { usePark, useAuth } from '/utils/hooks'
import { Button, Title } from '/components'
import styles from './Park.module.css'
import { updateDogsFromUser } from '/utils/api'
import { route } from 'next/dist/next-server/server/router';

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
	const { user } = useAuth()
	const { dogs, error } = usePark()
	const router = useRouter()

	async function handleUpdate() {
		try {
			await updateDogsFromUser(user, false)
			router.push('/')
		} catch (error) {
			console.log(`Park: ${error}`)
		}
	}

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
						{!dogs && <h3>No hay perros activos en el parque. Te enviaremos una notificacion cuando un perro ingrese al parque.</h3>}
					</div>
				</ul>

			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
				{dogs && <Button onClick={handleUpdate}>Salir del parque</Button>}
				<a href="/">Regresar</a>
			</div>
		</div>
	)
}