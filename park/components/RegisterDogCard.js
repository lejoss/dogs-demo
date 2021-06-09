import Link from 'next/link'
import styles from './RegisterDogCard.module.css'
export default function RegisterDogCard(props) {
	return (
		<section>
			<div className={styles.card}>
				<h3>{props.children || props.text}</h3>
				<Link href="/dog">{props.buttonText || 'Registrar'}</Link>
			</div>
		</section>
	)

}