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
    activeDogs,
    dogs,
    isLoading,
    sendNotifications,
    userDogs,
    visitPark,
  } = useHome()


  function registerVisit() {
    visitPark(true)
    sendNotifications()
  }

  function unregisterVisit() {
    visitPark(false)
  }

  const isUserVisiting = userDogs && userDogs.length > 0 && userDogs.every(({ active }) => active)
  const userHasDogs = dogs && userDogs && userDogs.length > 0

  return (
    <Container>
      {isLoading
        ? <Loading />
        : (
          <>
            <PageTitle
              text="parque laureles"
              icon="park_black_24dp.svg"
            />

            {userHasDogs
              ? (
                <>
                  {activeDogs.length > 0
                    ? <Card variant="accent"><p>{`${activeDogs.length} Perro en el parque`}</p></Card>
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

          </>
        )
      }
    </Container>
  )
}
