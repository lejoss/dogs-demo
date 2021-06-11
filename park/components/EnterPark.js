import { Button } from '.'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import { Card } from '.'
export default function EnterPark(props) {
	return (
		<Card item variant={props.disabled ? 'dark' : 'light'}>
			<Modal>
				<ModalOpenButton>
					<Button disabled={props.disabled} style={{ border: 0, background: 'transparent' }}>
						<div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: props.disabled ? 'gray' : '#005005' }}>
							<p style={{ fontSize: '1.125rem' }}>ENTRAR</p>
							{props.disabled
								? <img style={{ height: 40, width: 40, top: -10, position: 'relative' }} src="login_gray.svg" alt="" />
								: <img style={{ height: 40, width: 40, top: -10, position: 'relative' }} src="login.svg" alt="" />
							}
						</div>
					</Button>
				</ModalOpenButton>
				<ModalContents style={{ width: '83vw', borderRadius: 10 }} aria-label="Modal label (for screen readers)">
					<p style={{ color: 'rgb(0, 80, 5)', fontWeight: 200 }}>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
					<ModalDismissButton>
						<div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
							<Button style={{background: '#e1e1e1', width: 'auto', padding: '1em 2em', borderRadius: 5 }}>regresar</Button>
							<Button onClick={props.onEnter} style={{background: '#b9f6ca', width: 'auto', padding: '1em 2em', borderRadius: 5 }}>Confirmar</Button>
						</div>
					</ModalDismissButton>
				</ModalContents>
			</Modal>
		</Card>
	)
}