import webpush from '/webpush'

let pushSubscription;	
export default (req, res) => {
	if (req.method === 'POST') {
		pushSubscripton = req.body;
		res.status(200).json({ subscribe: true })
	}

}
