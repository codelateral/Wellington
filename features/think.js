import { thoughts } from "./arrays";
export default function think(message) {
	let index = Math.floor(Math.random() * thoughts.length);
	let thought = thoughts[index];
	if (thought) {
		message.channel.send(thought);
		thoughts.splice(index, 1);
		console.log(`I have ${thoughts.length} thoughts left`);
	} else {
		message.channel.send("I have no thoughts at this time");
	}
}
