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
    enterPark,
    isLoading,
    exitPark,
    user,
  } = useHome()	

  const userDogs = dogs && dogs.filter(dog => dog.userid === user)
  const activeDogs = dogs && dogs.filter(dog => dog.active)
  const isUserVisiting = userDogs && userDogs.length > 0 && userDogs.every(({ active }) => active)

  return (
    <>
      {isLoading
        ? <Loading />
        : (
          <Container>
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
                    <EnterPark onEnter={enterPark} disabled={isUserVisiting} />
                    <ViewAppInfo />
                    <ExitPark onExit={exitPark} disabled={!isUserVisiting} />
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
