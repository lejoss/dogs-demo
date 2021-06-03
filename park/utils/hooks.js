import React from 'react'
import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { urlBase64ToUint8Array, hashEndpoint } from '/utils'
import {
	subscribeUserToPushNotifications,
	fetchDogs,
	fetchUserByEndpoint,
	updateDogsFromUser,
	notificateUsersOfNewDogsInPark,
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
	const [user, setUser] = React.useState(null)
	const [error, setError] = React.useState(null)

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
				const hashedEndpoint = hashEndpoint(userSubscription.endpoint)
				const { user } = await fetchUserByEndpoint(hashedEndpoint)
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
	const queryClient = new QueryClient()
	useWorker()
	const router = useRouter()

	React.useEffect(() => {
		if (Notification.permission !== "granted") {
			router.push('/warn')
		}
	}, [])

	return { queryClient }

}

function useWarn() {
	const [permission, setPermission] = React.useState(null)
	const router = useRouter()

	React.useEffect(() => {
		if (permission === 'granted') {
			return router.push('/')
		} else {
			Notification.requestPermission().then((permission) => {
				setPermission(permission)
			})
		}
	}, [permission])

}

// TODO: add status and error handling
function useHome() {
	const { user } = useAuth()
	const router = useRouter()
	const queryClient = useQueryClient()
	const { data: dogs } = useQuery('dogs', () => fetchDogs(user))
	const { mutate: update } = useMutation(updates => updateDogsFromUser(user, updates), {
		onSettled: () => queryClient.invalidateQueries('dogs')
	})
	const { mutate: notificateUsers } = useMutation(() => notificateUsersOfNewDogsInPark())
	const goToPark = () => router.push('/park')
	const goToHome = () => router.push('/')

	return {
		dogs: dogs && dogs,
		update,
		notificateUsers,
		goToPark,
		goToHome,
		user,
	}
}

// TODO: add status and error handling
function usePark() {
	const { user } = useAuth()
	const router = useRouter()
	const queryClient = useQueryClient()
	const { data: dogs } = useQuery('dogs', () => fetchDogs())
	const { mutate: update } = useMutation(updates => updateDogsFromUser(user, updates), {
		onSettled: () => queryClient.invalidateQueries('dogs')
	})
	const goToHome = () => router.push('/')

	return {
		dogs,
		update,
		goToHome
	}
}

export {
	useApp,
	useAuth,
	useHome,
	usePark,
	usePush,
	useWarn,
}