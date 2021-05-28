import React from 'react'
import { useRouter } from 'next/router'
import { SubmitButton, DogInput, DogSelect } from '/components'
import { createDog } from '/utils/api'
import { useAuth } from '/utils/hooks'

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
	const { user } = useAuth()
	const router = useRouter()

	function handleSubmit(event) {
		event.preventDefault()
		if (!event.target.elements.length) return
		try {
			const [name, age, breed, size, gender] = event.target.elements
			createDog({
				user,
				name: name.value,
				age: age.value,
				breed: breed.value,
				size: size.value,
				gender: gender.value
			})
			// router.push('/park')

		} catch (error) {
			// TODO: handle error
		}
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