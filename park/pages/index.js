import React from 'react'
import { useRouter } from 'next/router'
import { useHome } from '/utils/hooks'
import { Button, Title } from '/components'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import { updateDogsFromUser, notificateUsersOfNewDogsInPark } from '/utils/api'
import styles from '../styles/Home.module.css'
import "@reach/dialog/styles.css";

export default function Home(props) {
  const { userDogs, error, user } = useHome()
  const router = useRouter()

  const visiting = userDogs && userDogs.every(({ active }) => active)
  async function handleRegisterVisit(active) {
    try {
      await updateDogsFromUser(user, active)
      await notificateUsersOfNewDogsInPark()
      router.push('/park')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={styles.container}>
      <Title>APP</Title>
      {userDogs && (
        <div className={styles.pets}>
          <h3>Tus Mascotas</h3>
          <ul className={styles.ul}>
            {userDogs && userDogs.length && userDogs.map((dog, i) => <li className={styles.li} key={i}>{dog.name}</li>)}
          </ul>
        </div>
      )}


      {visiting && (
        <div className={styles.visit}>
          <p>Actualmente estas visitando el parque, recuerda terminar tu visita aqui.</p>
          <Button onClick={() => handleRegisterVisit(false)}>salir</Button>
        </div>
      )}


      <div className={styles.btn__group}>
        {!userDogs && error && (
          <>
            <h3 style={{ textAlign: 'center' }}>No tienes perros registrados</h3>
            <a href="/dog">Registra tu mascota</a>
          </>
        )}

        <Modal>
          <ModalOpenButton>
            <Button>App Info</Button>
          </ModalOpenButton>
          <ModalContents style={{ width: '70vw' }} aria-label="Modal label (for screen readers)">
            <ModalDismissButton>
              <button>Cerrar</button>
            </ModalDismissButton>
            <h3>App Info</h3>
            <div>Some great contents of the modal</div>
          </ModalContents>
        </Modal>

        {userDogs && <a href="/dog">Registrar mascota</a>}

        <a className={styles.b} href="/park">Ver Parque</a>

        {userDogs && !visiting &&
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
                <button onClick={() => handleRegisterVisit(true)}>entrar</button>
              </ModalContents>
            </Modal>
          )
        }
      </div>
    </div>
  )
}
