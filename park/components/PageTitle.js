import { Row } from './'
import styles from './PageTitle.module.css'
export default function PageTitle(props) {
	return (
		<Row>
			<img className={styles.img} src={props.icon || ''} />	
			<h3 className={styles.title}>{props.text || ''}</h3>			
		</Row>
	)

}