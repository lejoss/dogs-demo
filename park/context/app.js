import React from 'react'
import { usePush } from '/utils/hooks'
import { fetchDogs, createDog } from '../utils/api';

const AppContext = React.createContext()
// AppContext.displayName = 'AppContext'

function AppProvider(props) {
	const { user } = usePush()
	const [dogs, setDogs] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(async () => {
		console.log('effect in provider')
		try {
			setIsLoading(true)
			const data = await fetchDogs()
			setDogs(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log('error fetching dogs in context')
		}
	}, [])

	const registerDog = async (formData) => {
		try {
			setIsLoading(true)
			const dogCreated = await createDog({ ...formData, userid: user })
			setIsLoading(false)
			setDogs([...dogs, dogCreated])
			router.push('/')
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to create a dog')
			router.push('/error')
		}
	}

	const visitPark = async (isVisiting) => {
		try {
			setIsLoading(true)
			const { data } = await updateDogsFromUser(user, isVisiting)
			if (!isVisiting) {
				await notificateUsersOfNewDogsInPark(user)
			}
			setDogs(dogs.map(dog => dog.id === data[0].id ? data[0] : dog))
			setIsLoading(false)
			router.push('/park')
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to enter park')
		}
	}

	const value = React.useMemo(() => ({
		dogs,
		isLoading,
		registerDog,
		user,
		visitPark,
	}), [user, dogs])
	return <AppContext.Provider value={value} {...props} />

}

export { AppProvider, AppContext }
