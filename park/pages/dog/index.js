import React from 'react'
import { useRouter } from 'next/router'
import { Button, DogInput, DogSelect, Title } from '/components'
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
	const { user: userid } = useAuth()
	const router = useRouter()

	function handleSubmit(event) {
		event.preventDefault()
		if (!event.target.elements.length) return
		try {
			const [name, age, breed, size, gender] = event.target.elements
			createDog({
				name: name.value,
				age: age.value,
				breed: breed.value,
				size: size.value,
				gender: gender.value,
				userid,
			})
			router.push('/')

		} catch (error) {
			// TODO: handle error
			console.error(error)
		}
	}

	return (
		<div style={{ padding: '2em', height: '100vh', overflow: 'hidden' }}>
			<Title>Registrar Mascota</Title>
			<form style={{ border: '1px solid lightgray', padding: '.5em', marginBottom: '2em' }} onSubmit={handleSubmit} {...props}>
				<div style={{ padding: '1em 1em 1em' }}>
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
				</div>
				<br />
				<Button type="submit">Registrar Mascota</Button>
			</form>

			<div style={{ padding: '.5em', border: '1px solid lightgray', marginTop: '1em', display: 'flex', flexDirection: 'column', gap: '1em' }}>
				<a href="/">REGRESAR</a>
			</div>
		</div>
	)

}