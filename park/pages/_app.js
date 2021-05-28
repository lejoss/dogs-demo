import { UserProvider } from '/context/user'
import { useApp } from '/utils/hooks'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useApp()
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp