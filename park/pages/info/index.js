import Link from 'next/link'
import { Card } from '/components'
import styles from './Info.module.css'
export default function Info() {
	return (
		<div className={styles.container}>
			<h3>🌳 &nbsp; Parque Laureles</h3>
			<Card variant="accent">
				<p>
					Gracias por usar esta aplicacion de prueba. El objetivo de esta aplicacion es generar una comunidad de perros en el parque Laureles.
				</p>
				<p>Si tienes alguna sugerencia o problema usando esta aplicacion puedes enviarlos a este correo</p>
				<p>nativo.alejandro@gmail.com</p>
			</Card>
			<br />
			<h3>🛠 &nbsp; Requisitos Minimos</h3>
			<Card variant="accent">
				<p>
					Para usar esta aplicacion debes tener activa las notificaciones del navegador 
					Google Chrome en tu celular ya que por medio de estas te notificaremos si hay un perro en el parque.
				</p>	
			</Card>
			<br />
			<h3>📲 &nbsp; Modo de uso</h3>
			<Card variant="accent">
				<ul>
					<li>Acepta las notificaciones en tu celular.</li>
					<li>Registra tu mascota.</li>
					<li>Usa el Boton de "ENTRAR" para notificar a otros usuarios que estas en el parque.</li>
					<li>Usa el Boton de "SALIR" cuando termines tu visita.</li>
				</ul>
			</Card>
			<br />
			<Link href="/">volver al Inicio</Link>
		</div>
		)
} 