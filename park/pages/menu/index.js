import { updateDog } from '/utils/api'
import { useAuth } from '/utils/hooks'

export default function MenuPage() {
	const { user } = useAuth()
	console.log('from ctx', user)
	return (
		<div>
			<h1>Menu</h1>
			<button onClick={() => updateDog(user)}>entrar</button>
		</div>
	)
}