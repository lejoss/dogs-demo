import { Card } from '.'
import Link from 'next/link'
export default function RegisterDog(props) {
	return (
		<Card variant="light">
			<p>{props.children || props.text}</p>
			<br />	
			<Link href="/dog">{props.buttonText || 'Registrar aqui'}</Link>
		</Card>
	)

}