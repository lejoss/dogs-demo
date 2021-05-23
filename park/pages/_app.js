import { useEffect, useState } from "react"
import { urlBase64ToUint8Array } from '/utils'
import '../styles/globals.css'

const PUBLIC_VAPID_KEY = "BAOVXVdGtk2zRG-PCveloPk-g19gH4OchfPkk65R4ICumAtdRTgaLz34Jl5_VHIDBXxj82rfv0jfvEU7FcaUAyM"


function MyApp({ Component, pageProps }) {
  const [registration, setRegistration] = useState(null)

  useEffect(async () => {
    if ("serviceWorker" in navigator) {
      try {
        const register = await navigator.serviceWorker.register("/sw.js", { scope: "/" })
        console.log("Service Worker registration successful with scope: ", register.scope)
        setRegistration(register)

      } catch (error) {
        console.log("Service Worker registration failed: ", error);
      }
    }
  }, [])

  useEffect(async () => {
    if (!registration) return
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await fetch("/api/subscription", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }, [registration])

  return <Component {...pageProps} />
}

export default MyApp