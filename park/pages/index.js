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
        <div style={{ padding: '5em 0 4em 2.2em' }}>
          <h1>Bienvenido!</h1>
          {userDogs && <div className={styles.title}>Mis Mascotas</div>}
        </div>
      </div>
      {userDogs && (
        <div className={styles.pets}>
          <ul className={styles.ul}>
            {userDogs && userDogs.length && dogs.map((dog, i) => {
              return (
                <li className={styles.li} key={i}>
                  <span> {dog.name}</span>
                  {' - '}
                  <span style={{ textTransform: 'capitalize' }}>{`${dog.age} años`}</span>
                  <div>
                    <small>5 visitas al parque</small>
                  </div>
                </li>
              )
            })}
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


      {!userDogs && (
        <div className={styles.btn__group}>
          <h3 style={{ textAlign: 'center' }}>No tienes perros registrados</h3>
          <Link href="/dog">Registrar mascota</Link>
        </div>
      )}


      {activeDogs && activeDogs.length
        ? <span>{`${activeDogs.length} Perro en el parque`}</span>
        : null
      }

      <div className={styles.row}>
        <Link href="/park">
          <div className={styles.item}>
            <span>VER PERROS EN EL PARQUE</span>
            <img style={{ height: 50, width: 50 }} src="grass.svg" alt="" />
          </div>
        </Link>


        {userDogs && !isUserVisiting && (
          <Modal>
            <ModalOpenButton>
              <div className={styles.item}>
                <button style={{ border: 0, background: 'transparent' }}>
                  <span>ENTRAR AL PARQUE</span>
                  <img style={{ height: 50, width: 50 }} src="grass.svg" alt="" />
                </button>
              </div>
            </ModalOpenButton>
            <ModalContents style={{ width: '83vw' }} aria-label="Modal label (for screen readers)">
              <h2>Confirma tu visita</h2>
              
              <p></p>
              <br />
              <ModalDismissButton>
                <Button>Cerrar</Button>
              </ModalDismissButton>
            </ModalContents>
          </Modal>
        )}






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
