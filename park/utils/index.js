import Crypto from 'crypto-js'

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function hashEndpoint(endpoint) {
  if (!endpoint) null

  let hash = Crypto.MD5(endpoint)
  hash = hash.toString(Crypto.enc.Hex)

  return hash
}

export {
  urlBase64ToUint8Array,
  hashEndpoint
}