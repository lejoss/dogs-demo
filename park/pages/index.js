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
    isLoading,
    sendNotifications,
    user,
    visitPark,
  } = useHome()


  const registerVisit = () => {
    visitPark(true)
    sendNotifications()
  }
  const unregisterVisit = () => visitPark(false)
  const setUserDogs = () => dogs.filter(dog => dog.userid === user)
	const setActiveDogs = () => dogs.filter(dog => dog.active)

  const userDogs = setUserDogs(dogs)
  const activeDogs = setActiveDogs(dogs)
  const isUserVisiting = userDogs && userDogs.length > 0 && userDogs.every(({ active }) => active)

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

            {userDogs && userDogs.length > 0
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
