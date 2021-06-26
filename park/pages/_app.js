import { AppProvider } from '/context/app'
import { useApp } from '/utils/hooks'
import '/styles/globals.css'

function MyApp({ Component, pageProps }) {
  useApp()
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp