import { useRouter } from 'next/router'
import { useMutation } from 'react-query';
import Link from 'next/link'
import { usePark, useAuth } from '/utils/hooks'
import { Button, Title } from '/components'
import styles from './Park.module.css'
import { updateDogsFromUser } from '/utils/api'
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
	const { user, dogs } = usePark()
	const { mutateAsync: update } = useMutation(() => updateDogsFromUser(user, false))
	const router = useRouter()

	async function handleUpdate() {
		try {
			await update()
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
				{dogs && (
					<Modal>
						<ModalOpenButton>
							<Button>Salir</Button>
						</ModalOpenButton>
						<ModalContents style={{ width: '83vw' }} aria-label="Modal label (for screen readers)">
							<h3>Confirmar Salida</h3>
							<p>Deseas salir del parque y terminar tu visita?.</p>
							<br />
							<div style={{ display: 'flex', gap: '1em' }}>
								<ModalDismissButton>
									<Button>Cerrar</Button>
								</ModalDismissButton>
								<Button onClick={handleUpdate}>Salir</Button>
							</div>
						</ModalContents>
					</Modal>
				)}
				<Link href="/">volver al Inicio</Link>
			</div>
		</div>
	)
}