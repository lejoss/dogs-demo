import styles from './Container.module.css'
export default function Container(props) {
	return <div className={`${styles.container} ${props.centered && styles.centered}`}>{props.children}</div>
}