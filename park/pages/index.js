import React from 'react'
import { useHome } from '/utils/hooks'
import {
  Card,
  Container,
  EnterPark,
  ExitPark,
  Loading,
  PageTitle,
  RegisterDog,
  Row,
  UserDogs,
  ViewAppInfo,
  ViewPark,
} from '/components'


export default function Home(props) {
  const {
    dogs,
    dogQueryStatus,
    notificationStatus,
    notificateUsers,
    user,
    update,
    updateStatus,
  } = useHome()


  function registerVisit() {
    notificateUsers()
    update(true)
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
  const userHasDogs = dogs && userDogs && userDogs.length > 0

  return (
    <>
      {dogQueryStatus === 'loading' || updateStatus === 'loading' || notificationStatus === 'loading'
        ? <Loading />
        : (
          <Container>
            <PageTitle
              text="parque laureles"
              icon="park_black_24dp.svg"
            />
            
            {userHasDogs
              ? (
                <>
                  {dogsInPark.length > 0
                    ? <Card variant="accent"><p>{`${dogsInPark.length} Perro en el parque`}</p></Card>
                    : <Card variant="dark"><p>No hay perros en el parque</p></Card>
                  }

                  <UserDogs
                    title="mi mascota"
                    dogs={userDogs}
                  />

                  <Row wrap>
                    <ViewPark />
                    <EnterPark onEnter={registerVisit} disabled={isUserVisiting} />
                    <ViewAppInfo />
                    <ExitPark onExit={unregisterVisit} disabled={!isUserVisiting} />
                  </Row>

                  {isUserVisiting
                    ? (<Card variant="dark">
                      <p>Estas visitando el parque. Termina tu visita con el boton de Salir.</p>
                    </Card>)
                    : null
                  }
                </>
              )
              : <RegisterDog text="NO TIENES PERROS REGISTRADOS" />
            }
          </Container>
        )
      }
    </>
  )
}
