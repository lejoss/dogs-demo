import styles from './DogSelect.module.css'
export default function DogSelect({ label, name, options: { values }, ...props }) {
	return (
		<label className={styles.select} htmlFor="">
			{label}
			<select name={name} {...props}>
				{values.length && values.map((value, key) => <option key={`${value}-${key}`} value={value.toLowerCase()}>{value}</option>)}
			</select>
		</label>
	)
}