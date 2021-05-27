import React from 'react'
import { SubmitButton, DogInput, DogSelect } from '/components'
import { useDogForm } from '/utils/hooks'


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

export default function CreateDog (props) {
	const { onSubmit } = useDogForm()

	return (
		<form onSubmit={onSubmit}>
			<DogInput
				aria-label="name"
				type="text"
				name="name"
			/>
			<DogInput
				aria-label="age"
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