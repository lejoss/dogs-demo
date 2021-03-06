import React from 'react'
import { usePush, useRoutes } from '/utils/hooks'
import { createDog, fetchDogs, notificateUsersOfNewDogsInPark, updateDogsFromUser } from '../utils/api';

const AppContext = React.createContext()
AppContext.displayName = 'AppContext'

function AppProvider(props) {
	const { user, isFetchingUser } = usePush()
	const { goToHome, goToError, goToPark } = useRoutes()
	const [dogs, setDogs] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(async () => {
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
	
	React.useEffect(() => {
		if (isFetchingUser) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [isFetchingUser])

	const registerDog = async (formData) => {
		if (!user) {
			alert('Lo sentimos, no hemos encontrado tu usuario en el sistema.')
			return
		}
		try {
			setIsLoading(true)
			const { data: dog } = await createDog({ ...formData, userid: user })
			setDogs([...dogs, dog])
			setIsLoading(false)
			goToHome()
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to create a dog')
			goToError()
		}
	}

	const visitPark = async (isActive) => {
		try {
			setIsLoading(true)
			isActive && await notificateUsersOfNewDogsInPark(user)
			const { data: [updatedDog] } = await updateDogsFromUser(user, isActive)
			setDogs(dogs?.map(dog => dog?.id === updatedDog?.id ? updatedDog : dog))
			setIsLoading(false)
			isActive && goToPark()
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
	}), [user, dogs, isLoading])
	return <AppContext.Provider value={value} {...props} />

}

export { AppProvider, AppContext }
