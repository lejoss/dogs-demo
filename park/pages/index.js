import React from 'react'
import Link from 'next/link'
import { useHome } from '/utils/hooks'
import {
  AppInformation,
  Card,
  Container,
  EnterPark,
  ExitPark,
  PageTitle,
  RegisterDog,
  Row,
  UserDogs,
  ViewPark
} from '/components'


export default function Home(props) {
  const {
    user,
    dogs,
    goToPark,
    update,
    notificateUsers
  } = useHome()

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

      {userHasDogs && (
        <>
          <UserDogs
            title="mis perros"
            dogs={userDogs}
          />

          {dogsInPark.length > 0
            ? <Card variant="light"><p>{`${dogsInPark.length} Perro en el parque`}</p></Card>
            : <Card variant="dark"><p>No hay perros en el parque</p></Card>
          }

          <Row wrap>
            <ViewPark />
            <EnterPark onEnter={registerVisit} disabled={isUserVisiting} />
            <AppInformation />
            <ExitPark onExit={unregisterVisit} disabled={!isUserVisiting} />
          </Row>

           {isUserVisiting
            ? (<Card variant="dark">
              <p>Estas visitando el parque. Termina tu visita con el boton de Salir.</p>
            </Card>)
            : null
          }
        </>
      )}

      {!userDogs || !userDogs.length && (
        <RegisterDog text="NO TIENES PERROS REGISTRADOS" />
      )}
    </Container>
  )
}
