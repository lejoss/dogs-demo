import { updateDog } from '/utils/api'
import { useAuth } from '/utils/hooks'

export default function MenuPage() {
	const { user } = useAuth()
	return (
		<div>
			<h1>Menu</h1>
			<button onClick={() => updateDog(user)}>entrar</button>
		</div>
	)
}