import DogForm from '/pages/dogs/'
import styles from '../styles/Home.module.css'


export default function Home(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrar mascota</h1>
      <DogForm className={styles.form} />
    </div>
  )
}
