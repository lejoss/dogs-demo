import React from 'react'
import { urlBase64ToUint8Array } from '/utils'
import { subscribeUserToPushNotifications } from '/utils/api'

const PUBLIC_VAPID_KEY = "BH_9hevSlpxlb1NBPBRm6failiqdu6oFX7cQizdCws9koKp8tfbjjQE2QUSfk750SNe58UFRIJSkFQEoOrkqjVA"

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
	React.useEffect(async () => {
		try {
			const register = await navigator.serviceWorker.ready
			const userSubscription = await register.pushManager.getSubscription()

			if (!userSubscription) {
				const subscription = await register.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
				})
				subscribeUserToPushNotifications(subscription)
			} else {
				// TODO: handle 
			}
		} catch (error) {
			console.log(error)
		}
	}, [])

}

function useApp() {
	useWorker()
	usePush()
}

export {
	useApp
}