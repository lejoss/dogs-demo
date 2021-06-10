import Link from 'next/link'
import { Card } from './'
export default function ViewPark(props) {
	return (
		<Card item variant="light">
			<Link href="/park">
				<div style={{ padding: '.5em', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#005005', fontSize: '1.5rem' }}>
					<p style={{ margin: 0 }}>parque</p>
					<img src="park_black_24dp.svg" />
				</div>
			</Link>  
		</Card>
	)
}