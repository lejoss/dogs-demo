
async function client(endpoint, options) {
	return window
		.fetch(endpoint, options)
		.then(async response => {
			const data = await response.json()
			if (response.ok) {
				return data
			} else {
				return Promise.reject(data)
			}

		})
}

export { client }