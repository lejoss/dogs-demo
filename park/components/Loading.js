import { Container } from './'
export default function Loading(props) {
	return (
		<Container centered>
			<img src="sync.svg" />
			<p style={{ color: 'rgb(0, 80, 5)' }}>{props.text || 'CARGANDO DATOS'}</p>
		</Container>
	)
}