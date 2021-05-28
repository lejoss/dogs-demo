import { SubscriptionProvider } from '/context/subscription'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SubscriptionProvider>
      <Component {...pageProps} />
    </SubscriptionProvider>
  )
}

export default MyApp