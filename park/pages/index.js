import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useHome } from '/utils/hooks'
import { Button, Title } from '/components'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import styles from '../styles/Home.module.css'
import "@reach/dialog/styles.css";

export default function Home(props) {
  const { user, dogs, goToPark, update, notificateUsers } = useHome()
  const router = useRouter()

  function registerVisit() {
    update(true)
    notificateUsers()
    goToPark()
  }

  function unregisterVisit() {
    update(false)
    // TODO: replace this line
    // instead use mutation options for refreshing queries
    // goToHome()
  }

  const activeDogs = dogs && dogs.filter(dog => dog.active);
  const userDogs = dogs && dogs.filter(({ userid }) => userid === user)
  const isUserVisiting = userDogs && userDogs.every(({ active }) => active)

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div style={{ padding: '5em 0 5em 2.2em' }}>
          {userDogs && <div className={styles.title}>Mis Mascotas</div>}
        </div>
      </div>
      {userDogs && (
        <div className={styles.pets}>
          <ul className={styles.ul}>
            {userDogs && userDogs.length && dogs.map((dog, i) => <li className={styles.li} key={i}>{dog.name}</li>)}
          </ul>
        </div>
      )}


      {isUserVisiting && (
        <div className={styles.visit}>
          <p>Actualmente estas visitando el parque. Recuerda terminar tu visita aqui.</p>
          <Modal>
            <ModalOpenButton>
              <Button style={{ background: '#d81b60' }}>Salir</Button>
            </ModalOpenButton>
            <ModalContents style={{ width: '83vw', fontSize: '1.5rem' }} aria-label="Modal label (for screen readers)">
              <h3>Confirmar Salida</h3>
              <p>Deseas salir del parque y terminar tu visita?.</p>
              <div style={{ display: 'flex', gap: '1em' }}>
                <ModalDismissButton>
                  <Button>Cerrar</Button>
                </ModalDismissButton>
                <ModalDismissButton>
                  <Button style={{ background: '#d81b60' }} onClick={unregisterVisit}>Salir</Button>
                </ModalDismissButton>
              </div>
            </ModalContents>
          </Modal>
        </div>
      )}

      <div className={styles.btn__group}>
        {!userDogs && (
          <>
            <h3 style={{ textAlign: 'center' }}>No tienes perros registrados</h3>
          </>
        )}

        <Link href="/dog">Registrar mascota</Link>

      </div>

      <div className={styles.park}>
        {activeDogs && activeDogs.length
          ? <span>{`${activeDogs.length} Perro en el parque`}</span>
          : <span>{'No hay perros en el parque'}</span>
        }
        <br />
        <br />
        <Link className={styles.btn} href="/park">Ver Parque</Link>
        <div style={{ marginTop: '.6em' }}></div>

        {dogs && !isUserVisiting &&
          (
            <Modal>
              <ModalOpenButton>
                <Button>Registrar Visita</Button>
              </ModalOpenButton>
              <ModalContents style={{ width: '83vw', fontSize: '1.5rem' }} aria-label="Modal label (for screen readers)">
                <h3>Confirmar Visita</h3>
                <p>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
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
      </div>

      <br />
      <br />



      <div className={styles.info}>
        <Modal>
          <ModalOpenButton>
            <Button>Informacion</Button>
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
      </div>

    </div>
  )
}
