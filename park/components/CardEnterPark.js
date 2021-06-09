import { Button } from './'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import styles from './CardEnterPark.module.css'

export default function CardEnterPark(props) {
	return (
		<div style={{ borderRadius: 10, background: '#b9f6ca', flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
			<Modal>
				<ModalOpenButton>
					<Button style={{ border: 0, background: 'transparent' }}>
						<div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#005005' }}>
							<span>ENTRAR</span>
							<img style={{ height: 50, width: 50 }} src="login.svg" alt="" />
						</div>
					</Button>
				</ModalOpenButton>
				<ModalContents style={{ width: '83vw', fontSize: '1.5rem' }} aria-label="Modal label (for screen readers)">
					<h3>Confirma tu visita</h3>
					<p>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
					<br />
					<ModalDismissButton>
						<div style={{ display: 'flex', gap: 10 }}>
							<Button>CERRAR</Button>
							<Button onClick={props.onEnter}>ENTRAR</Button>
						</div>
					</ModalDismissButton>
				</ModalContents>
			</Modal>
		</div>
	)
}