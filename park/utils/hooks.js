import React from 'react'
import { useRouter } from 'next/router'
import { urlBase64ToUint8Array } from '/utils'
import {
	subscribeUserToPushNotifications,
	fetchOnlineDogs,
	fetchUser,
	fetchDogsByUser,
} from '/utils/api'
import { SubscriptionContext } from '/context/subscription'

const NEXT_PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY

// function useClient() {
// 	return React.useCallback((endpoint, options) => client(endpoint, options), [])
// }

function useWorker() {
	React.useEffect(async () => {
		if ("serviceWorker" in navigator) {
			try {
				const register = await navigator.serviceWorker.register("/sw.js", { scope: "/" })
				console.log("Service Worker registration successful with scope: ", register.scope)

			} catch (error) {
				console.log("Service Worker registration failed: ", error);
			}
		}
	}, [])
}

function usePush() {
	const [user, setUser] = React.useState('')
	const [error, setError] = React.useState('')

	React.useEffect(async () => {
		try {
			const register = await navigator.serviceWorker.ready
			const userSubscription = await register.pushManager.getSubscription()

			if (!userSubscription) {
				const subscription = await register.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_KEY)
				})

				const { user } = await subscribeUserToPushNotifications(subscription)
				setUser(user)

			} else {
				const { user } = await fetchUser(userSubscription.endpoint);
				setUser(user)
			}

		} catch (error) {
			setError(error)
		}

	}, [])

	return { user, error }
}

function useAuth() {
	const context = React.useContext(SubscriptionContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a SubscriptionProvider`)
	}
	return context
}

function useApp() {
	useWorker()
	const router = useRouter()
	React.useEffect(() => {
		if (Notification.permission !== "granted") {
			router.push('/warn')
		}
	}, [])
}

function useWarn() {
	const router = useRouter()
	React.useEffect(() => {
		if (Notification.permission === "granted") {
			router.push('/')
		}
	}, [])

}

function useHome() {
	const [userDogs, setUserDogs] = React.useState([])
	const [error, setError] = React.useState(null)
	const { user } = useAuth()

	React.useEffect(async () => {
		if (!user || user === '') return
		try {
			const userDogs = await fetchDogsByUser(user)
			if (userDogs.length) {
				setUserDogs(userDogs)
			}

		} catch (error) {
			setError(error)
		}

	}, [user])

	return { user, userDogs, error }
}

function usePark() {
	const [dogs, setDogs] = React.useState()
	const [error, setError] = React.useState()

	React.useEffect(async () => {
		try {
			const dogs = await fetchOnlineDogs()
			setDogs(dogs)
		} catch (error) {
			setError(error)
		}
	}, [])

	return { dogs, error }
}

export {
	useApp,
	useAuth,
	useHome,
	usePark,
	usePush,
	useWarn,
	useWorker,
}