import React from 'react'
import { useMutation } from 'react-query';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useHome } from '/utils/hooks'
import { Button, Title } from '/components'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import { updateDogsFromUser, notificateUsersOfNewDogsInPark } from '/utils/api'
import styles from '../styles/Home.module.css'
import "@reach/dialog/styles.css";

export default function Home(props) {
  const { dogs, isError, user, status } = useHome()
  const { mutate: update } = useMutation(updates => updateDogsFromUser(user, updates))
  const { mutate: pushNotification } = useMutation(() => notificateUsersOfNewDogsInPark())
  const router = useRouter()

  function registerVisit() {
    update(true)
    pushNotification()
    router.push('/park')
  }

  function unregisterVisit() {
    update(false)
  }

  const visiting = dogs && dogs.every(({ active }) => active)

  return (
    <div className={styles.container}>
      <Title>APP</Title>
      {dogs && (
        <div className={styles.pets}>
          <h3>Tus Mascotas</h3>
          <ul className={styles.ul}>
            {dogs && dogs.length && dogs.map((dog, i) => <li className={styles.li} key={i}>{dog.name}</li>)}
          </ul>
        </div>
      )}


      {visiting && (
        <div className={styles.visit}>
          <p>Actualmente estas visitando el parque. Recuerda terminar tu visita aqui.</p>
          <Button onClick={unregisterVisit}>salir</Button>
        </div>
      )}


      <div className={styles.btn__group}>
        {!dogs && (
          <>
            <h3 style={{ textAlign: 'center' }}>No tienes perros registrados</h3>
            <Link href="/dog">Registra tu mascota</Link>
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

        {dogs && <Link href="/dog">Registrar mascota</Link>}

        {dogs && !visiting &&
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
                  <Button onClick={registerVisit}>entrar</Button>
                </div>
              </ModalContents>
            </Modal>
          )
        }
        <Link className={styles.b} href="/park">Ver Parque</Link>
      </div>
    </div>
  )
}
