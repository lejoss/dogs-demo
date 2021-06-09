import React from 'react'
import { useHome } from '/utils/hooks'
import {
  Button,
  CardEnterPark,
  Container,
  CurrentDogsInPark,
  ExitParkModalCard,
  PageTitle,
  RegisterDogCard,
  Row,
  UserDogsCard
} from '/components'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
import styles from '../styles/Home.module.css'
import "@reach/dialog/styles.css";


export default function Home(props) {
  const { user, dogs, goToPark, update, notificateUsers } = useHome()

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

  const dogsInPark = dogs && dogs.filter(dog => dog.active);
  const userDogs = dogs && dogs.filter(({ userid }) => userid === user)

  const isUserVisiting = userDogs && userDogs.length > 0 && userDogs.every(({ active }) => active)
  const userHasDogs = userDogs && userDogs.length > 0

  return (
    <Container>
      <PageTitle
        text="parque laureles"
        icon="park_black_24dp.svg"
      />

      {!userDogs || !userDogs.length && (
        <RegisterDogCard text="NO TIENES PERROS REGISTRADOS" />
      )}

      {userHasDogs && (
        <>
          <UserDogsCard
            title="mis perros"
            dogs={userDogs}
          />
          <CurrentDogsInPark count={dogsInPark.length || 0} />
        </>
      )}


      {isUserVisiting
        ? <ExitParkModalCard onExit={unregisterVisit} />
        : (<Row wrap>
            <CardEnterPark onEnter={registerVisit} />
            <CardEnterPark onEnter={registerVisit} />
            <CardEnterPark onEnter={registerVisit} />
            <CardEnterPark onEnter={registerVisit} />
          </Row>
        )}


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

    </Container>
  )
}
