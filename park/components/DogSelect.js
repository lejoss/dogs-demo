export default function DogSelect ({ options: { name, values }, ...props }) {
	return (
		<select name={name} {...props}>
			{values.length && values.map((value, key) => <option key={`${value}-${key}`} value={value.toLowerCase()}>{value}</option>)}
		</select>
	)
}