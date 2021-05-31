import { useWarn } from '/utils/hooks'
import { Title } from '/components'
import styles from '/styles/globals.css'

export default function Warning(props) {
	useWarn()
	return (
		<div style={styles.container}>
			<Title>Advertencia</Title>
			<p>porfavor activa las notificaciones en este sitio para usar la aplicacion y recarga la app</p>
		</div>
	)
}