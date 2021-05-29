import React from 'react'
import { urlBase64ToUint8Array } from '/utils'
import { subscribeUserToPushNotifications, fetchOnlineDogs } from '/utils/api'
// import { client } from '/utils/client'
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
			console.log(register)
			const userSubscription = await register.pushManager.getSubscription()
			if (!userSubscription) {
				console.log('creating sub')
				const subscription = await register.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_KEY)
				})

				const user = await subscribeUserToPushNotifications(subscription)
				setUser(user)

			} else {
				console.log('old sub', userSubscription)
				// fetch user
				setUser(userSubscription.endpoint)
			}

		} catch (error) {
			console.log('error push use effect')
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
	useAuth,
	usePark,
	usePush,
	useWorker
}