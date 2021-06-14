import React from 'react'
import Link from 'next/link'
import { usePark } from '/utils/hooks'
import styles from './Park.module.css'
import "@reach/dialog/styles.css"

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
	const { dogs } = usePark()
	console.log('park', dogs)
	const activeDogs = dogs && dogs.filter(dog => dog.active)

	const [listData, setListData] = React.useState(() => {
		const activeDogs = dogs && dogs.filter(dog => dog.active)
		return activeDogs
	})

	function handleChangeList(event) {
		const { value } = event.target
		if (value && value === 'active') {
			setListData(activeDogs)
		} else {
			setListData(dogs)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.list__header}>
				<select onChange={handleChangeList} name="select list">
					<option value="active">Perros activos</option>
					<option value="all">Perros del parque</option>
				</select>
			</div>		
			<div className={styles.park}>
				<ul className={styles.ul}>
					{
						listData && listData.length
							? listData.map((dog, i) => {
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
							: (
								<div style={{ textAlign: 'center', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '0 2em' }}>
									{activeDogs && !activeDogs.length && <h3>No hay perros activos en el parque. Te enviaremos una notificacion cuando un perro ingrese al parque.</h3>}
								</div>
							)
					}
					
				</ul>

			</div>
			<Link href="/">volver al Inicio</Link>
		</div>
	)
}