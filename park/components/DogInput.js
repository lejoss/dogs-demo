import styles from './DogInput.module.css'
export default function DogInput(props) {
	return (
		<label className={styles.label}>
			{props.label}
			<input required {...props} />
		</label>
	)
}