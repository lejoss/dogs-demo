import Link from 'next/link'
import { Card } from './'
export default function ViewAppInfo(props) {
	return (
		<Card item variant="light" pointer>
			<Link href="/info">
				<div style={{ padding: '.5em', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#005005' }}>
					<p style={{ margin: 0 }}>info</p>
					<img src="info.svg" />
				</div>
			</Link>
		</Card>
	)
}