import { useWarn } from '/utils/hooks'
import { Title } from '/components'
import styles from './Warning.module.css'

export default function Warning(props) {
	useWarn()
	return (
		<div className={styles.container}>
			<Title>Advertencia</Title>
			<div className={styles.warn__message}>
				<p>para usar la aplicacion activa las notificaciones y recarga la pantalla </p>
			</div>
			
		</div>
	)
}