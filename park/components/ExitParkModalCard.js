import { Button } from './'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import styles from './ExitParkModalCard.module.css'

export default function ExitParkModalCard(props) {
	return (
		<div className={styles.visit}>
			<p>Estas visitando el parque. Termina tu visita aqui.</p>
			<Modal>
				<ModalOpenButton>
					<Button style={{ background: 'transparent', color: '#005005' }}>Salir</Button>
				</ModalOpenButton>
				<ModalContents style={{ width: '83vw', fontSize: '1.5rem' }} aria-label="Modal label (for screen readers)">
					<h3>Confirmar Salida</h3>
					<p>Deseas salir del parque y terminar tu visita?.</p>
					<div style={{ display: 'flex', gap: '1em' }}>
						<ModalDismissButton>
							<Button>Cerrar</Button>
						</ModalDismissButton>
						<ModalDismissButton>
							<Button style={{ background: '#d81b60' }} onClick={props.onExit}>Salir</Button>
						</ModalDismissButton>
					</div>
				</ModalContents>
			</Modal>
		</div>
	)
}