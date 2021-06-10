import { Card } from '.'
import Link from 'next/link'
import styles from './RegisterDog.module.css'
export default function RegisterDog(props) {
	return (
		<section>
			<Card variant="accent">
				<h3>{props.children || props.text}</h3>
				<Link href="/dog">{props.buttonText || 'Registrar'}</Link>
			</Card>
		</section>
	)

}