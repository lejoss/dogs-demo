import { Button, Card } from '.'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
export default function ExitPark(props) {
	return (
		<Card item variant={props.disabled ? 'dark' : 'light'}>
			<Modal>
				<ModalOpenButton>
					<Button disabled={props.disabled} style={{ border: 0, background: 'transparent' }}>
						<div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: props.disabled ? 'gray' : '#005005' }}>
						<p style={{ fontSize: '1.125rem'}}>salir</p>
								{props.disabled
									? <img style={{ height: 40, width: 40, top: -10, position: 'relative' }} src="logout_gray.svg" alt="" />
									: <img style={{ height: 40, width: 40, top: -10, position: 'relative' }} src="logout.svg" alt="" />
								}
						</div>
					</Button>
				</ModalOpenButton>
				<ModalContents style={{ width: '83vw' }} aria-label="Modal label (for screen readers)">
					<h3>Confirma tu visita</h3>
					<p>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
					<br />
					<ModalDismissButton>
						<div style={{ display: 'flex', gap: 10 }}>
							<Button>CERRAR</Button>
							<Button onClick={props.onExit}>ENTRAR</Button>
						</div>
					</ModalDismissButton>
				</ModalContents>
			</Modal>
		</Card>
	)
}
