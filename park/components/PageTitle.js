import { Row } from './'
import styles from './PageTitle.module.css'
export default function PageTitle(props) {
	return (
		<Row>
			<img className={styles.img} src={props.icon || ''} />	
			<h1 className={styles.title}>{props.text || ''}</h1>			
		</Row>
	)

}