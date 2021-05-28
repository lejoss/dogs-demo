import React from 'react'
import { usePush } from '/utils/hooks'

const SubscriptionContext = React.createContext()
// SubscriptionContext.displayName = 'SubscriptionContext'

function SubscriptionProvider(props) {
	const { user } = usePush()
	const value = { user }

	return <SubscriptionContext.Provider value={value} {...props} />

}

export { SubscriptionProvider, SubscriptionContext }
