import React from 'react'
import { useRouter } from 'next/router'
import { usePush } from '/utils/hooks'
import { createDog, fetchDogs, notificateUsersOfNewDogsInPark, updateDogsFromUser } from '../utils/api';

const AppContext = React.createContext()
// AppContext.displayName = 'AppContext'

function AppProvider(props) {
	const { user } = usePush()
	const router = useRouter()
	const [dogs, setDogs] = React.useState(null)
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

	const registerDog = async (formData) => {
		try {
			setIsLoading(true)
			const { data: dog } = await createDog({ ...formData, userid: user })
			setDogs([...dogs, dog])
			setIsLoading(false)
			router.push('/')
		} catch (error) {
			setIsLoading(false)
			console.log('error trying to create a dog')
			router.push('/error')
		}
	}

	const visitPark = async (isActive) => {
		try {
			setIsLoading(true)
			isActive && await notificateUsersOfNewDogsInPark(user)
			const { data } = await updateDogsFromUser(user, isActive)
			setDogs(dogs.map(dog => dog.id === data[0].id ? data[0] : dog))
			isActive && router.push('/park')
			setIsLoading(false)
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
