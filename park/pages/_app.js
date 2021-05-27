import { useApp } from '/utils/hooks'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useApp()
  return <Component {...pageProps} />
}

export default MyApp