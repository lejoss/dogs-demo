import React from 'react'
import { SubmitButton, DogInput, DogSelect } from '/components'
import { createDog } from '/utils/api'

const breedOptions = {
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
	function handleSubmit(event) {
		event.preventDefault()
		if (!event.target.elements.length) return

		const [name, age, breed, size, gender] = event.target.elements
		createDog({ name, age, breed, size, gender })
		// redirect to menu
	}

	return (
		<form onSubmit={handleSubmit}>
			<DogInput
				type="text"
				name="name"
			/>
			<DogInput
				type="number"
				name="age"
			/>
			<DogSelect
				name="breeds"
				options={breedOptions}
			/>
			<DogSelect
				name="sizes"
				options={sizeOptions}
			/>
			<DogSelect
				name="gender"
				options={genderOptions}
			/>

			<SubmitButton>Registrar</SubmitButton>
		</form>
	)

}