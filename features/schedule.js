export default function schedule(message) {
	console.log(`${message.author} asked for the schedule`);
	message.channel.send(
		"Code Lateral streams thrice a week, every Tuesday (5pm), Thursday (5pm), and Saturday (6pm)."
	);
}
