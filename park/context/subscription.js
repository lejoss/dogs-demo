import React from 'react'
import { usePush, useWorker } from '/utils/hooks'

const SubscriptionContext = React.createContext()
SubscriptionContext.displayName = 'SubscriptionContext'

function SubscriptionProvider(props) {
	const [user, setUser] = React.useState(null)

	React.useEffect(async () => {
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
			console.log(error)
		}

	}, [])

	const value = { user }


	return <SubscriptionContext.Provider value={value} {...props} />

}

export { SubscriptionProvider, SubscriptionContext }
