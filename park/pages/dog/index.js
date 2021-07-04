import React from 'react'
import { useDogs } from '/utils/hooks'
import { Button, DogInput, DogSelect, Loading } from '/components'
import styles from './Dog.module.css'

const breedOptions = {
	values: [
		'Akita',
		'Alaskan Husky',
		'Beagle',
		'Border Collie',
		'Boxer',
		'Bulldog',
		'Bull Terrier',
		'Criollo',
		'Chihuahua',
		'Chow Chow',
		'Cocker Spaniel',
		'Dálmata',
		'Dobermann',
		'Fila Brasileiro',
		'Fox terrier',
		'Gran Danés',
		'Husky Siberiano',
		'Poodle',
		'Pitbull',
		'Pastor aleman',
		'Pastor Belga',
		'Samoyedo',
		'San Bernardo',
		'Shar Pei',
		'Shih Tzu',
		'Teckel',
		'Terrier',
		'Yorkie',
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
	const { create, isLoading } = useDogs()


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
		}
		create(formData)
	}

	return (
		<>
			{isLoading
				? <Loading text="CREANDO TU MASCOTA" />
				: (
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
		</>
	)

}