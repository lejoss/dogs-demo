import React from 'react'
import { useHome } from '/utils/hooks'
import styles from '../styles/Home.module.css'

// if user don't have a registered dog
// display a message suggesting the user to register a dog in order to continue 
// ask user to register dog
// on success re-direct  user to home page with updated data
// display menu options (visit park, see park)


export default function Home(props) {
  const { userDogs, error } = useHome()
  return (
    <div className={styles.container}>
      {
        userDogs
          ? 'show menu'
          : 'please register dog'
      }
    </div>
  )
}
