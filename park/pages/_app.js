import { useEffect, useState } from "react"
import { urlBase64ToUint8Array } from '/utils'
import '../styles/globals.css'



const PUBLIC_VAPID_KEY = "BH_9hevSlpxlb1NBPBRm6failiqdu6oFX7cQizdCws9koKp8tfbjjQE2QUSfk750SNe58UFRIJSkFQEoOrkqjVA"


function MyApp({ Component, pageProps }) {
  const [registration, setRegistration] = useState(null)

  // useEffect(async () => {
  //   if ("serviceWorker" in navigator) {
  //     try {
  //       const register = await navigator.serviceWorker.register("/sw.js", { scope: "/" })
  //       console.log("Service Worker registration successful with scope: ", register.scope)
  //       setRegistration(register)

  //     } catch (error) {
  //       console.log("Service Worker registration failed: ", error);
  //     }
  //   }
  // }, [])

  // useEffect(async () => {
  //   if (!registration) return
  //   const subscription = await registration.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  //   });

  //   await fetch("/api/subscription", {
  //     method: "POST",
  //     body: JSON.stringify(subscription),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  // }, [registration])

  return null
}

export default MyApp