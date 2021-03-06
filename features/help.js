export default function help(message) {
	console.log(`${message.author} asked for help`);
	message.channel.send(
		`
        **!schedule** - Lists our streaming schedule
**!decide [arg1] [arg2] [enter as many (or little) as you want]** - Let Sir Wellington decide something for you
**!race** - Begins a code race
**!end** - Ends a code race
**!dad** - Sends a dad joke
**!bored** - Sir Wellington will suggest an activity

**You can also ask Sir Wellington what he's thinking anytime. Just make sure you address him so he knows you're talking to him**
         `
	);
}
