import React from 'react'
import { useRouter } from 'next/router'
import { useHome } from '/utils/hooks'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import { updateUserDogs } from '/utils/api'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const { userDogs, error, user } = useHome()
  const router = useRouter()

  async function handleRegisterVisit() {
    try {
      await updateUserDogs(user)
      router.push('/park')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      {!userDogs && (
        <>
          <h3>No tienes perros registrados</h3>
          <button onClick={() => router.push('/dog')}>Registra tu mascota</button>
        </>
      )}
      {userDogs && (
        <div>
          <h3>Tus Mascotas</h3>
          <ul>
            {userDogs && userDogs.map((dog, i) => <li key={i}>{dog.name}</li>)}
          </ul>
        </div>
      )}

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
  )
}
