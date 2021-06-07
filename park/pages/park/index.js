import Link from 'next/link'
import { usePark } from '/utils/hooks'
import { Button, Title } from '/components'
import styles from './Park.module.css'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import "@reach/dialog/styles.css";

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
	const { dogs, goToHome, update } = usePark()

	function handleUpdate(active) {
		update(active)
		goToHome()
	}

	const activeDogs = dogs && dogs.filter(dog => dog.active);

	return (
		<div className={styles.container}>
			<div className={styles.park}>
				<ul className={styles.ul}>
					{
						activeDogs
							? activeDogs.map((dog, i) => {
								return (
									<li className={styles.li} key={i}>
										<Card>
											<CardAvatar>
												<img src="pawn.svg" alt="" />
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
													{/* <span>Raza</span> */}
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
						{activeDogs && !activeDogs.length && <h3>No hay perros activos en el parque. Te enviaremos una notificacion cuando un perro ingrese al parque.</h3>}
					</div>
				</ul>

			</div>
			<Link style={{ color: '#8e24aa' }} href="/">volver al Inicio</Link>
		</div>
	)
}