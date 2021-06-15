import React from 'react'
import { useRouter } from 'next/router'
import { Button, DogInput, DogSelect, Loading } from '/components'
import { createDog } from '/utils/api'
import { useAuth } from '/utils/hooks'

import styles from './Dog.module.css'

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
	const { user: userid } = useAuth()
	const router = useRouter()


	async function handleSubmit(event) {
		event.preventDefault()
		if (!event.target.elements.length) return

		const [name, age, breed, size, gender] = event.target.elements
		const formData = {
			name: name.value,
			age: age.value,
			breed: breed.value,
			size: size.value,
			gender: gender.value,
			userid,
		}
		try {
			await createDog(formData)
			router.push('/')
		} catch (error) {
			console.log('ERROR CREATING DOG, PLEASE TRY AGAIN LATER.')
		}
	}

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} {...props}>
				<DogInput
					type="text"
					name="name"
					label="nombre"
				/>
				<DogInput
					type="number"
					name="age"
					label="edad"
				/>
				<DogSelect
					name="breeds"
					options={breedOptions}
					label="raza"
				/>
				<DogSelect
					name="sizes"
					options={sizeOptions}
					label="tamaño"
				/>
				<DogSelect
					name="gender"
					options={genderOptions}
					label="genero"
				/>
				<br />
				<br />
				<Button style={{ background: 'transparent', color: '#005005', fontSize: '1.2rem' }} type="submit">Registrar</Button>
			</form>
		</div>
	)

}