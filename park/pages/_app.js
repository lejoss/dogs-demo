import { useEffect, useState } from "react"
import { urlBase64ToUint8Array } from '/utils'
import '../styles/globals.css'

const PUBLIC_VAPID_KEY = "BH_9hevSlpxlb1NBPBRm6failiqdu6oFX7cQizdCws9koKp8tfbjjQE2QUSfk750SNe58UFRIJSkFQEoOrkqjVA"

async function subscribeForPushNotifications(subscription) {
  return await fetch("/api/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function MyApp({ Component, pageProps }) {

  useEffect(async () => {
    if ("serviceWorker" in navigator) {
      try {
        const register = await navigator.serviceWorker.register("/sw.js", { scope: "/" })
        console.log("Service Worker registration successful with scope: ", register.scope)

      } catch (error) {
        console.log("Service Worker registration failed: ", error);
      }
    }
  }, [])

  useEffect(() => {
    navigator.serviceWorker.ready
      .then(register => {
        register.pushManager.getSubscription()
          .then(async sub => {
            if (!sub) {
              const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
              });

              subscribeForPushNotifications(subscription)
            } else {
              subscribeForPushNotifications(sub)
            }
          })
          .catch(err => console.log(err))
      })

  }, [])

  return <Component {...pageProps} />
}

export default MyApp