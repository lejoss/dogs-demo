import { QueryClient, QueryClientProvider } from 'react-query'
import { SubscriptionProvider } from '/context/subscription'
import { useApp } from '/utils/hooks'
import '/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { queryClient } = useApp()
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>
        <Component {...pageProps} />
      </SubscriptionProvider>
    </QueryClientProvider>
  )
}

export default MyApp