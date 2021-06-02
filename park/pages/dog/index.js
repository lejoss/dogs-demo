import React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
	const { mutate: update, isSuccess, isError, isLoading, data } = useMutation(formData => createDog(formData))
	const router = useRouter()

	React.useEffect(() => {
		if (!data || !isSuccess) return 
		router.push('/')
	}, [data, isSuccess])

	function handleSubmit(event) {
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
		update(formData)
	}

	return (
		<div style={{ padding: '2em', height: '100vh', overflow: 'hidden' }}>
			<Title>Registrar Mascota</Title>
			<form style={{ border: '3px solid #81C67A', padding: '.5em', marginBottom: '2em', borderRadius: 10 }} onSubmit={handleSubmit} {...props}>
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

			<div style={{ borderRadius: 10, padding: '.5em', border: '3px solid #81C67A', marginTop: '1em', display: 'flex', flexDirection: 'column', gap: '1em' }}>
				<Link href="/">REGRESAR</Link>
			</div>
		</div>
	)

}