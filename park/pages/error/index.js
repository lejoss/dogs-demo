import Link from 'next/link'
import { Container, Card } from '/components/'
import styles from './Error.module.css'

export default function Error() {
	return (
		<div className={styles.error__container}>
			<Card variant="accent">
				<p style={{ color: '#ef5350' }}>Lo sentimos hubo un error procesando tu informacion</p>
				<img src="error.svg" />	
				<Link href="/">Volver al Inicio</Link>
			</Card>
		</div>
	)
}