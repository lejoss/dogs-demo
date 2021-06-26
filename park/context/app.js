import React from 'react'
import { usePush } from '/utils/hooks'
import { fetchDogs } from '../utils/api';

const AppContext = React.createContext()
// AppContext.displayName = 'AppContext'

function AppProvider(props) {
	const { user } = usePush()
	const [dogs, setDogs] = React.useState(null)
	// const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(async () => {
		console.log('effect in provider')
		try {
			// setIsLoading(true)
			const data = await fetchDogs()
			setDogs(data)
			// setIsLoading(false)
		} catch (error) {
			// setIsLoading(false)
			console.log('error fetching dogs in context')
		}
	}, [])

	const value = React.useMemo(() => ({ user, dogs }), [dogs])
	return <AppContext.Provider value={value} {...props} />

}

export { AppProvider, AppContext }
