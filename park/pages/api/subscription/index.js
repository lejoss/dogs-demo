import webpush from '/webpush'


export default async (req, res) => {

	if (req.method === 'POST') {
		const pushSubscripton = req.body;
		res.status(200).json();

		// const { message } = req.body;

		console.log(':::: sub ::::', pushSubscripton);

		const payload = JSON.stringify({
			title: "Park Notification",
			message: "Hola estoy en el parque"
		});

		try {
			await webpush.sendNotification(pushSubscripton, payload);
		} catch (error) {
			console.log(':::: error ::::', error);
		}

	}
}
