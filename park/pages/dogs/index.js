import React from 'react'
import { SubmitButton, DogInput, DogSelect } from '/components'
import { useDogForm } from '/utils/hooks'
import { createDog } from '/utils/api'


//   iduser Int?

const breedOptions = {
	name: 'breeds',
	values: [
		'criollo',
		'pitbull',
		'pastor aleman',
		'border collie',
		'lobo siberiano',
	]
}

const sizeOptions = {
	name: 'sizes',
	values: [
		'pequeño',
		'mediano',
		'grande'
	]
}

const genderOptions = {
	name: 'gender',
	values: [
		'macho',
		'hembra'
	]
}

export default function DogForm(props) {
	const { onSubmit, formData } = useDogForm()
	// const { status, error, run } = useAsync()

	React.useEffect(() => {
		if (!formData) return
		// run(createDog(formData))

	}, [onSubmit, formData])

	return (
		<form onSubmit={onSubmit}>
			<DogInput
				type="text"
				name="name"
			/>
			<DogInput
				type="number"
				name="age"
			/>
			<DogSelect options={breedOptions} />
			<DogSelect options={sizeOptions} />
			<DogSelect options={genderOptions} />

			<SubmitButton>Registrar</SubmitButton>
		</form>
	)

}