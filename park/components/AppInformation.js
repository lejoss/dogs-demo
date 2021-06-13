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
				<ModalContents style={{ width: '83vw', borderRadius: 10, height: '80vh', overflow: 'scroll', fontWeight: 200 }} aria-label="Modal label (for screen readers)">
					<h3>Parque Laureles</h3>
					<p>
						El objetivo de esta aplicacion es generar una comunidad de perros en el parque Laureles. 
						Si la usamos bien podremos saber cuales son los perros que visitan el parque mediante una notificacion que nos llegara al ceular.
					</p>
					<h3>Requisitos Minimos</h3>
					<p>
						Para poder usar esta aplicacion debes tener activa las notificaciones del navegador 
						Google Chrome en tu celular ya que por medio de estas te notificaremos si hay un perro en el parque.
					</p>	
					<h3>Modo de uso</h3>
					<ul>
						<li>Acepta las notificaciones en tu celular.</li>
						<li>Registra tu mascota.</li>
						<li>Usa el Boton de "ENTRAR" para notificar a otros usuarios que estas en el parque.</li>
						<li>Usa el Boton de "SALIR" cuando termines tu visita</li>
					</ul>
			
					<ModalDismissButton>
						<div style={{ display: 'flex', gap: 10 }}>
							<Button>CERRAR</Button>
						</div>
					</ModalDismissButton>
				</ModalContents>
			</Modal>
		</Card>
	)
}