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

      <div style={{ color: '#005005', fontSize: '1.5rem', fontWeight: '200', textAlign: 'center', display: 'flex', alignItems: 'flex-end', gap: 5 }}>
        <img style={{ maxHeight: 40, maxWidth: 40 }} src="park_black_24dp.svg" />
        <span>PARQUE LAURELES</span>
      </div>

      <br />
      <br />

      {userDogs && userDogs.length > 0 && (
        <div className={styles.pets}>
          <div style={{ color: '#8e24aa', fontSize: '1.5rem', fontWeight: '200', textAlign: 'center', display: 'flex', alignItems: 'flex-end', gap: 5 }}>
            <span>MIS PERROS</span> 
          </div>
          <br /> 
          <ul className={styles.ul}>
            {userDogs && userDogs.length > 0 && dogs.map((dog, i) => {
              return (
                <li className={styles.li} key={i}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <img style={{ maxHeight: 40, maxWidth: 40 }} src="pawn.svg" />
                    <span> {dog.name}</span>
                    {' - '}
                    <span style={{ textTransform: 'capitalize' }}>{`${dog.age} años`}</span>
                    </div>
                  <div>
                    <small>5 visitas al parque</small>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}  

      {userDogs && userDogs.length > 0 && (
        <div>
          <br />
          {activeDogs && activeDogs.length
            ? (
                <div style={{ padding: '.5', marginBottom: '1em' }} className={styles.active__dog}>
                  <p style={{ margin: 0 }}>{`${activeDogs.length} Perro en el parque`}</p>
                  <br />
                  <Link style={{ color: '#005005' }} href="/park">Ir al parque</Link>
                </div>
              )
            : <p style={{ background: '#E1E2E1' }} className={styles.active__dog}>No hay perros en el parque</p> 
          }
        </div>
      )}

      {userDogs && userDogs.length > 0 && isUserVisiting && (
        <div className={styles.visit}> 
          <p>Estas visitando el parque. Termina tu visita aqui.</p>
          <Modal>
            <ModalOpenButton>
              <Button style={{ background: 'transparent', color: '#005005' }}>Salir</Button>
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

      {isUserVisiting && <div style={{ flex: 1 }} />}
      {!userDogs || !userDogs.length && (
        <div>
          <br />
          <div className={styles.btn__group}>
            <h3 style={{ textAlign: 'center', color: '#005005' }}>NO TIENES PERROS REGISTRADOS</h3>
            <Link href="/dog">Registrar Aqui</Link>
          </div>
        </div>
      )}


    {userDogs && (
      <div>
        <br />
        {!isUserVisiting && (
          <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ borderRadius: 10, background: '#b9f6ca', flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
              {userDogs && !isUserVisiting && (
                <Modal>
                  <ModalOpenButton>
                    <Button style={{ border: 0, background: 'transparent' }}>
                      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#005005' }}>
                        <span>ENTRAR</span>
                        <img style={{ height: 50, width: 50 }} src="login.svg" alt="" />
                      </div>
                    </Button>
                  </ModalOpenButton>
                  <ModalContents style={{ width: '83vw', fontSize: '1.5rem' }} aria-label="Modal label (for screen readers)">
                    <h3>Confirma tu visita</h3>
                    <p>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
                    <br />
                    <ModalDismissButton>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <Button>CERRAR</Button>
                        <Button onClick={registerVisit}>ENTRAR</Button>
                      </div>
                    </ModalDismissButton>
                  </ModalContents>
                </Modal>
              )}
            </div>
            <div style={{ borderRadius: 10, background: '#b9f6ca', flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
              {userDogs && !isUserVisiting && (
                <Modal>
                  <ModalOpenButton>
                    <Button style={{ border: 0, background: 'transparent' }}>
                      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', color: '#005005' }}>
                        <span>ENTRAR</span>
                        <img style={{ height: 50, width: 50 }} src="login.svg" alt="" />
                      </div>
                    </Button>
                  </ModalOpenButton>
                  <ModalContents style={{ width: '83vw', fontSize: '1.5rem' }} aria-label="Modal label (for screen readers)">
                    <h3>Confirma tu visita</h3>
                    <p>Confirma tu visita para notificar a otros usuarios que hay perros del parque.</p>
                    <br />
                    <ModalDismissButton>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <Button>CERRAR</Button>
                        <Button onClick={registerVisit}>ENTRAR</Button>
                      </div>
                    </ModalDismissButton>
                  </ModalContents>
                </Modal>
              )}
            </div>

           
          </div>
        )}
      </div>
     )}

      {/* {isUserVisiting && (
        <div className={styles.info}>
          <Button style={{ color: '#005005', background: 'transparent' }}>VOLVER AL PARQUE</Button>
        </div>
      )} */}

{/*  


      <div className={styles.info}>
        <Modal>
          <ModalOpenButton>
            <Button style={{ background: 'transparent', color: '#005005' }}>Informacion</Button>
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
      </div> */}

    </div>
  )
}
