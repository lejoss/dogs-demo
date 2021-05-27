export default function ({ options: { name, values }, ...props }) {
	return (
		<select name={name} {...props}>
			{values.length && values.map(value => {
				<option value={value.toLowerCase()}>{value}</option>
			})}
		</select>
	)
}