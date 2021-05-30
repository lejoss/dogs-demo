import { useWarn } from '/utils/hooks'
import styles from './Warning.module.css'

export default function Warning(props) {
	useWarn()
	return (
		<div>
			<h1>Advertencia</h1>
			<p>porfavor activa las notificaciones en este sitio para usar la aplicacion</p>
		</div>
	)
}