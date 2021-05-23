import webpush from '/webpush'


export default (req, res) => {
	if (req.method === 'POST') {
		const pushSubscripton = req.body;
		console.log('::::  sub  ::::', pushSubscripton)
		res.status(201).json({ subscribe: true })
	}

}
