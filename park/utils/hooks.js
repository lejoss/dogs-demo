import React from 'react'
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
	useWorker()
	const router = useRouter()

	// React.useEffect(() => {
	// 	if (Notification.permission !== "granted") {
	// 		router.push('/warn')
	// 	}
	// }, [])

}

function useWarn() {
	// const [permission, setPermission] = React.useState(null)
	// const router = useRouter()

	// React.useEffect(() => {
	// 	if (permission === 'granted') {
	// 		return router.push('/')
	// 	} else {
	// 		Notification.requestPermission().then((permission) => {
	// 			setPermission(permission)
	// 		})
	// 	}
	// }, [permission])

}

function useHome() {
	const { user } = useAuth()
	const [dogs, setDogs] = React.useState(null)
	// const router = useRouter()
	
	React.useEffect(async () => {
		try {
			const data = await fetchDogs()
			setDogs(data)
		} catch (error) {
			console.log('ERROR TRYING TO FETCH DOGS IN USE HOME')
		}
	}, [])
	// updateDogsFromUser(user, updates)
	// notificateUsersOfNewDogsInPark(user)


	return {
		dogs,
		// notificateUsers,
		user,
	}
}


function usePark() {
	const [dogs, setDogs] = React.useState(null)
	const [activeDogs, setActiveDogs] = React.useState(null)
	const [listData, setListData] = React.useState([])

	const setList = list => setListData(list)

	React.useEffect(async () => {
		try {
			const data = await fetchDogs()
			setActiveDogs(data.filter(dog => dog.active))
			setDogs(data)
			setListData(activeDogs)
		} catch (error) {
			console.log('ERROR TRYING TO FETCH DOGS IN PARK')
		}
	}, [])


	return {
		activeDogs,
		dogs,
		listData,
		setList,
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