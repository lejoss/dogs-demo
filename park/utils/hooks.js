import React from 'react'
import { useQuery, useMutation, QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { urlBase64ToUint8Array, hashEndpoint } from '/utils'
import {
	subscribeUserToPushNotifications,
	fetchDogsOnline,
	fetchUserByEndpoint,
	fetchDogsFromUser,
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
				const hashedEndpoint = hashEndpoint(userSubscription.endpoint)
				const { user } = await fetchUserByEndpoint(hashedEndpoint);
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
	const router = useRouter()
	React.useEffect(() => {
		if (Notification.permission === "granted") {
			router.push('/')
		}
	}, [])

}

function useHome() {
	const { user } = useAuth()
	const { status, data, isError } = useQuery('user-dogs', () => {
		return fetchDogsFromUser(user)
	})

	return {
		user,
		dogs: data && data.dogs,
		status,
		isError,
	}
}

function usePark() {
	const { user } = useAuth()
	const { status, data, isError } = useQuery('online-dogs', () => {
		return fetchDogsOnline()
	})

	return {
		dogs: data && data,
		isError,
		status,
		user
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