import { useWarn } from '/utils/hooks'
import { Title, Card, Container } from '/components'

export default function Warning(props) {
	useWarn()
	return (
		<Container>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			{/* <Title>Advertencia</Title> */}
			<Card variant="accent">
				<p>Para usar esta aplicacion activa las notificaciones y recarga la pantalla </p>
				<p>
					Si por accidente seleccionaste "No permitir notificaciones"
				</p>
				<a style={{ color: 'green' }} href="https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DAndroid&hl=es">sigue estos pasos</a>
				<p>Si tu telefono es un Iphone, lo sentimos, esta aplicacion no soporta Iphone.</p>
			</Card>
		</Container>
	)
}