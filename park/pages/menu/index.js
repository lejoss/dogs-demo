import { useRouter } from 'next/router'
import { updateDog } from '/utils/api'
import { useAuth } from '/utils/hooks'

export default function MenuPage() {
	const { user } = useAuth()
	const router = useRouter()
	return (
		<div>
			<h1>Menu</h1>
			<button onClick={() => updateDog(user)}>entrar</button>
			<button onClick={() => router.push('/park')}>ver parque</button>
		</div>
	)
}