export default function DogInput(props) {
	return (
		<label>
			{props.name}
			<input required {...props} />
		</label>
	)
}