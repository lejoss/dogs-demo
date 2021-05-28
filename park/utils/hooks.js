import React from 'react'
import { urlBase64ToUint8Array } from '/utils'
import { subscribeUserToPushNotifications } from '/utils/api'
// import { client } from '/utils/client'
import { SubscriptionContext } from '/context/subscription'

const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY

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
		// if (user) return
		try {
			const register = await navigator.serviceWorker.ready
			const userSubscription = await register.pushManager.getSubscription()

			if (!userSubscription) {
				const subscription = await register.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
				})
				await subscribeUserToPushNotifications(subscription)
				setUser(subscription.endpoint)

			} else {
				setUser(userSubscription.endpoint)
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

export {
	useAuth,
	usePush,
	useWorker
}