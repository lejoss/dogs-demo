import styles from './Button.module.css'
export default function Button(props) {
	return <button disabled={props.disabled} className={styles.btn} {...props} />
}