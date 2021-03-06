import styles from './Row.module.css'
export default function Row(props) {
	return <div className={`${styles.row} ${props.wrap && styles.wrap}`}>{props.children}</div>
}