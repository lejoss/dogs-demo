import { SubscriptionProvider } from '/context/subscription'
import { useWorker } from '/utils/hooks'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useWorker()
  return (
    <SubscriptionProvider>
      <Component {...pageProps} />
    </SubscriptionProvider>
  )
}

export default MyApp