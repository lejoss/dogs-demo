import React from 'react'
import { useRouter } from 'next/router'
import { urlBase64ToUint8Array, hashEndpoint } from '/utils'
import {
	subscribeUserToPushNotifications,
	fetchUserByEndpoint,
} from '/utils/api'
import { AppContext } from '/context/app'


const NEXT_PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY

function useRoutes() {
	const router = useRouter()
	return {
		goToDog: () => router.push('/dog'),
		goToError: () => router.push('/error'),
		goToHome: () => router.push('/'),
		goToInfo: () => router.push('/info'),
		goToPark: () => router.push('/park'),
		goToWarn: () => router.push('/warn'),
	}
}

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
	const { goToWarn } = useRoutes()
	const [user, setUser] = React.useState(null)
	const [error, setError] = React.useState(null)
	const [isFetchingUser, setIsFetchingUser] = React.useState(false)

	React.useEffect(async () => {
		if ('Notification' in window) {
			try {
				const register = await navigator.serviceWorker.ready
				const userSubscription = await register.pushManager.getSubscription()
				if (!userSubscription) {
					const subscription = await register.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_KEY)
					})
					setIsFetchingUser(true)
					const { user } = await subscribeUserToPushNotifications(subscription)
					setIsFetchingUser(false)
					setUser(user)

				} else {
					const hashedEndpoint = hashEndpoint(userSubscription.endpoint)
					setIsFetchingUser(true)
					const { user } = await fetchUserByEndpoint(hashedEndpoint)
					setIsFetchingUser(false)
					setUser(user)
				}

			} catch (error) {
				setError(error)
			}
		} else {
			alert('Lo sentimos 😓, Tu dispositivo no soporta las notificaciones web del navegador')
			goToWarn()
		}

	}, [])

	return { user, error, isFetchingUser }
}

function useAuth() {
	const context = React.useContext(AppContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AppProvider`)
	}
	return context
}

function useApp() {
	useWorker()
}

function useWarn() {
	const [permission, setPermission] = React.useState(null)
	const { goToHome } = useRoutes()

	React.useEffect(() => {
		if (permission === 'granted') {
			return goToHome()
		} else {
			Notification.requestPermission().then((permission) => {
				setPermission(permission)
			})
		}
	}, [permission])
}

function useHome() {
	const {
		dogs,
		isLoading,
		user,
		visitPark
	} = useAuth()

	return {
		dogs,
		isLoading,
		user,
		visitPark,
	}
}

function useDogs() {
	const { isLoading, registerDog } = useAuth()
	return { create: registerDog, isLoading }
}

function usePark() {
	const { dogs, isLoading, user } = useAuth()
	const [listData, setListData] = React.useState([])

	const setList = list => setListData(list)

	React.useEffect(() => {
		if (!dogs ?.length) return
		setListData(dogs ?.filter(dog => dog ?.active))
	}, [dogs])

	return {
		dogs,
		isLoading,
		listData,
		setList,
		user,
	}
}

export {
	useApp,
	useAuth,
	useDogs,
	useHome,
	usePark,
	usePush,
	useRoutes,
	useWarn,
}