import { Button, Card } from '.'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
// import styles from './AppInformation.module.css'
export default function AppInformation(props) {
	return (
		<Card item variant="light">
			<Modal>
				<ModalOpenButton>
					<Button style={{ border: 0, background: 'transparent' }}>
						<div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#005005' }}>
						<p style={{ fontSize: '1.125rem'}}>INFO</p>
							<img style={{ height: 40, width: 40, top: -10, position: 'relative' }} src="info.svg" alt="" />
						</div>
					</Button>
				</ModalOpenButton>
				<ModalContents style={{ width: '83vw', borderRadius: 10 }} aria-label="Modal label (for screen readers)">
					{/* <h3>Confirma tu visita</h3>
					<p>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
					<br />
					<ModalDismissButton>
						<div style={{ display: 'flex', gap: 10 }}>
							<Button>CERRAR</Button>
							<Button onClick={props.onExit}>ENTRAR</Button>
						</div>
					</ModalDismissButton> */}
				</ModalContents>
			</Modal>
		</Card>
	)
}