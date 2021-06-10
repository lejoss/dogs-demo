import { Card } from '.'
import Link from 'next/link'
export default function RegisterDog(props) {
	return (
		<section>
			<Card variant="ligth">
				<h3>{props.children || props.text}</h3>
				<Link href="/dog">{props.buttonText || 'Registrar'}</Link>
			</Card>
		</section>
	)

}