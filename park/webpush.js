
import webpush from "web-push"

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webpush.setVapidDetails(
	"mailto:zephiano@gmail.com",
	PUBLIC_VAPID_KEY,
	PRIVATE_VAPID_KEY
);

module.exports = webpush