import React from 'react'
import { urlBase64ToUint8Array } from '/utils'
import { subscribeUserToPushNotifications } from '/utils/api'
import { client } from '/utils/client'

const PUBLIC_VAPID_KEY = "BH_9hevSlpxlb1NBPBRm6failiqdu6oFX7cQizdCws9koKp8tfbjjQE2QUSfk750SNe58UFRIJSkFQEoOrkqjVA"

// function useSafeDispatch(dispatch) {
// 	const mounted = React.useRef(false)

// 	React.useLayoutEffect(() => {
// 		mounted.current = true
// 		return () => (mounted.current = false)
// 	}, [])
// 	return React.useCallback(
// 		(...args) => (mounted.current ? dispatch(...args) : void 0),
// 		[dispatch],
// 	)
// }

// const defaultInitialState = { status: 'idle', data: null, error: null }
// function useAsync(initialState = {}) {
// 	const initialStateRef = React.useRef({
// 		...defaultInitialState,
// 		...initialState,
// 	})

// 	const [{ status, data, error }, setState] = React.useReducer(
// 		(s, a) => ({ ...s, ...a }),
// 		initialStateRef.current,
// 	)

// 	const safeSetState = useSafeDispatch(setState)

// 	const setData = React.useCallback(
// 		data => safeSetState({ data, status: 'resolved' }),
// 		[safeSetState],
// 	)
// 	const setError = React.useCallback(
// 		error => safeSetState({ error, status: 'rejected' }),
// 		[safeSetState],
// 	)

// 	const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
// 		safeSetState,
// 	])

// 	const run = React.useCallback(
// 		promise => {
// 			if (!promise || !promise.then) {
// 				throw new Error(
// 					`The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
// 				)
// 			}
// 			safeSetState({ status: 'pending' })
// 			return promise.then(
// 				(data) => {
// 					setData(data)
// 					return data
// 				},
// 				(error) => {
// 					setError(error)
// 					return Promise.reject(error)
// 				},
// 			)
// 		},
// 		[safeSetState, setData, setError],
// 	)

// 	return {
// 		isIdle: status === 'idle',
// 		isLoading: status === 'pending',
// 		isError: status === 'rejected',
// 		isSuccess: status === 'resolved',

// 		reset,
// 		setData,
// 		setError,
// 		error,
// 		status,
// 		data,
// 		run,
// 	}
// }

function useClient() {
	return React.useCallback((endpoint, options) => client(endpoint, options), [])
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
				// TODO: set user context?
				console.log('user already subscribed', userSubscription)
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
	useApp,
}