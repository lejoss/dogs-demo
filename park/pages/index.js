import React from 'react'
import Link from 'next/link'
import { useHome } from '/utils/hooks'
import {
  AppInformation,
  Card,
  Container,
  CurrentDogsInPark,
  EnterPark,
  ExitPark,
  ModalExitPark,
  PageTitle,
  RegisterDog,
  Row,
  UserDogs
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
          <CurrentDogsInPark count={dogsInPark.length || 0} />
          <ModalExitPark onExit={unregisterVisit} />
          <Row wrap>
            <AppInformation />
            <EnterPark onEnter={registerVisit} />
            <ExitPark onExit={unregisterVisit} />
            <Card item variant="light">
                <Link href="/park">
                  Ver
                </Link>
                <img src="visibility.svg" />
              

            </Card>
          </Row>
        </>
      )}

      {!userDogs || !userDogs.length && (
        <RegisterDog text="NO TIENES PERROS REGISTRADOS" />
      )}
    </Container>
  )
}
