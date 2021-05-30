import styles from './SubmitButton.module.css'
export default function SubmitButton (props) {
	return <button className={styles.submit__btn} type="submit" {...props} />
}