import React from 'react'
import { useRouter } from 'next/router'
import { urlBase64ToUint8Array, hashEndpoint } from '/utils'
import {
	createDog,
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
	const router = useRouter()
	const [dogs, setDogs] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false)

	const enterPark = async () => {
		try {
			setIsLoading(true)
			const { data } = await updateDogsFromUser(user, true)
			await notificateUsersOfNewDogsInPark(user)
			setDogs(dogs.map(dog => dog.id === data[0].id ? data[0] : dog))
			setIsLoading(false)
			router.push('/park')
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to enter park')
		}
	}

	const exitPark = async () => {
		try {
			setIsLoading(true)
			const { data } = await updateDogsFromUser(user, false)
			setDogs(dogs.map(dog => dog.id === data[0].id ? data[0] : dog))
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to leave park')
		}
	}

	React.useEffect(async () => {
		try {
			setIsLoading(true)
			const data = await fetchDogs()
			setDogs(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log('ERROR TRYING TO FETCH DOGS IN USE HOME')
		}
	}, [])

	return {
		dogs,
		enterPark,
		exitPark,
		isLoading,
		user,
	}
}

function useDogs() {
	const { user: userid } = useAuth()
	const router = useRouter()
	const [isLoading, setIsLoading] = React.useState(false)

	const create = async (formData) => {
		try {
			setIsLoading(true)
			await createDog({
				...formData,
				userid,
			})
			setIsLoading(false)
			router.push('/')
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to create a dog')
			router.push('/error')
		}
	}

	return { create, isLoading }
}

function usePark() {
	const [dogs, setDogs] = React.useState([])
	const [listData, setListData] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false)

	const setList = list => setListData(list)

	React.useEffect(async () => {
		try {
			setIsLoading(true)
			const data = await fetchDogs()
			setDogs(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log('ERROR TRYING TO FETCH DOGS IN PARK')
		}
	}, [])

	React.useEffect(() => {
		if (!dogs.length) return
		setListData(dogs.filter(dog => dog.active))
	}, [dogs])

	return {
		dogs,
		isLoading,
		listData,
		setList,
	}
}

export {
	useApp,
	useAuth,
	useDogs,
	useHome,
	usePark,
	usePush,
	useWarn,
}