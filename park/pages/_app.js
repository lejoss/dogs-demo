import { SubscriptionProvider } from '/context/subscription'
import { useApp } from '/utils/hooks'
import '/styles/globals.css'

function MyApp({ Component, pageProps }) {
  useApp()
  return (
    <SubscriptionProvider>
      <Component {...pageProps} />
    </SubscriptionProvider>
  )
}

export default MyApp