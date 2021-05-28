import React from 'react'
// import {} from '/utils/hooks'

const UserContext = React.createContext()
UserContext.displayName = 'UserContext'

function UserProvider(props) {
	const value = { user: 'lolo' }

	// React.useEffect(() => {

	// }, [])

	return <UserContext.Provider value={value} {...props} />

}

export { UserProvider, UserContext }
