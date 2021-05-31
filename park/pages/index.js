import React from 'react'
import { useRouter } from 'next/router'
import { useHome } from '/utils/hooks'
import { Button, Title } from '/components'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import { updateUserDogs, notificateUsersOfNewDogsInPark } from '/utils/api'
import styles from '../styles/Home.module.css'
import "@reach/dialog/styles.css";

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
          <Button onClick={() => router.push('/dog')}>Registra tu mascota</Button>
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

      <div className={styles.btn__group}>
        {userDogs && <Button onClick={() => router.push('/dog')}>Registrar mascota</Button>}
        <Button onClick={() => router.push('/park')}>Ver Parque</Button>

        {userDogs &&
          (
            <Modal>
              <ModalOpenButton>
                <Button>Registrar Visita</Button>
              </ModalOpenButton>
              <ModalContents style={{ width: '70vw' }} aria-label="Modal label (for screen readers)">
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
            <Button>App Info</Button>
          </ModalOpenButton>
          <ModalContents style={{ width: '70vw' }}  aria-label="Modal label (for screen readers)">
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
