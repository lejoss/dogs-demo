import React from 'react'
import { useRouter } from 'next/router'
import { useHome } from '/utils/hooks'
import Title from '/components/Title'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import { updateUserDogs, notificateUsersOfNewDogsInPark } from '/utils/api'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const { userDogs, error, user } = useHome()
  const router = useRouter()

  async function handleRegisterVisit() {
    try {
      await updateUserDogs(user)
      await notificateUsersOfNewDogsInPark()
      router.push('/park')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={styles.container}>
      <Title>APP</Title>
      {!userDogs && (
        <>
          <h3>No tienes perros registrados</h3>
          <button onClick={() => router.push('/dog')}>Registra tu mascota</button>
        </>
      )}
      {userDogs && (
        <div className={styles.pets}>
          <h3>Tus Mascotas</h3>
          <ul className={styles.ul}>
            {userDogs && userDogs.map((dog, i) => <li className={styles.li} key={i}>{dog.name}</li>)}
          </ul>
        </div>
      )}

      <div className={styles.links}>
        {userDogs && <button onClick={() => router.push('/dog')}>Registra otra mascota</button>}
        <button onClick={() => router.push('/park')}>Ver Parque</button>

        {userDogs &&
          (
            <Modal>
              <ModalOpenButton>
                <button>Registrar Visita</button>
              </ModalOpenButton>
              <ModalContents aria-label="Modal label (for screen readers)">
                <ModalDismissButton>
                  <button>Cerrar</button>
                </ModalDismissButton>
                <h3>Confirmar Visita</h3>
                <div>Some great contents of the modal</div>
                <button onClick={handleRegisterVisit}>entrar</button>
              </ModalContents>
            </Modal>
          )
        }

        <Modal>
          <ModalOpenButton>
            <button>App Info</button>
          </ModalOpenButton>
          <ModalContents aria-label="Modal label (for screen readers)">
            <ModalDismissButton>
              <button>Cerrar</button>
            </ModalDismissButton>
            <h3>App Info</h3>
            <div>Some great contents of the modal</div>
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}
