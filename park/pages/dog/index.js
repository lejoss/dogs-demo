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
			<form style={{ color: '#005005', background: 'white', marginTop: '2em', padding: '2em', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }} onSubmit={handleSubmit} {...props}>
				<div>
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
				<br />
				<Button style={{ background: 'transparent', color: '#005005' }} type="submit">Registrar</Button>
			</form>
			<br />
			<Link href="/">VOLVER AL INICIO</Link>
		</div>
	)

}