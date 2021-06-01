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
          <p>Actualmente estas visitando el parque. Recuerda terminar tu visita aqui.</p>
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
          <ModalContents style={{ width: '83vw' }} aria-label="Modal label (for screen readers)">
            <h3>App Info</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            </p>
            <br />
            <ModalDismissButton>
              <Button>Cerrar</Button>
            </ModalDismissButton>
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
              <ModalContents style={{ width: '83vw' }} aria-label="Modal label (for screen readers)">
                <h3>Confirmar Visita</h3>
                <p>Confirma tu visita para notificar a otros usuarios del parque.</p>
                <br />
                <div style={{ display: 'flex', gap: '1em' }}>
                  <ModalDismissButton>
                    <Button>Cerrar</Button>
                  </ModalDismissButton>
                  <Button onClick={() => handleRegisterVisit(true)}>entrar</Button>
                </div>
              </ModalContents>
            </Modal>
          )
        }
      </div>
    </div>
  )
}
