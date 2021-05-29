
import webpush from "web-push"

webpush.setVapidDetails(
	"mailto:zephiano@gmail.com",
	process.env.NEXT_PUBLIC_VAPID_KEY,
	process.env.PRIVATE_VAPID_KEY
);

module.exports = webpush