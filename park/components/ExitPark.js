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
				<ModalContents style={{ width: '83vw', borderRadius: 10 }} aria-label="Modal label (for screen readers)">
					<p>Terminar Visita?</p>
					<br />
					<ModalDismissButton>
						<div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
							<Button style={{background: '#e1e1e1', width: 'auto', padding: '1em 2em', borderRadius: 5 }}>No</Button>
							<Button style={{background: '#e1e1e1', width: 'auto', padding: '1em 2em', borderRadius: 5 }} onClick={props.onExit}>Si</Button>
						</div>
					</ModalDismissButton>
				</ModalContents>
			</Modal>
		</Card>
	)
}
