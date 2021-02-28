import startRace from "./features/codeRace";

require("dotenv").config();
const request = require("request");
const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "!";

client.once("ready", () => {
	console.log("Sir Wellington is at your service ;)");
});
let raceStarted = false;
let raceText = null;
client.on("message", (message) => {
	if (message.author.bot) return;

	// outlier checks
	if (
		message.content.includes("lol") ||
		message.content.includes("lmao") ||
		message.content.includes("haha")
	) {
		if (Math.floor(Math.random() * 10000) > 8900) {
			message.reply("That isn't funny");
		}
	}
	if (
		raceStarted &&
		message.content !== "!race" &&
		message.content !== "!end"
	) {
		if (message.content === raceText) {
			message.reply(`Congratulations, you have won.`);
			raceText = null;
			raceStarted = false;
		} else {
			message.reply(
				`I'm sorry, that doesn't match the text exactly. Please try again.`
			);
		}
	}
	// begin regular commands
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "commands" || command === "help") {
		message.channel.send(
			`
			**!schedule** - Lists our streaming schedule
**!race** - Begins a code race
**!end** - Ends a code race
**!dad** - Sends a dad joke
**!bored** - Sir Wellington will suggest an activity
			`
		);
	}

	if (command === "schedule") {
		message.channel.send(
			"Code Lateral streams thrice a week, every Tuesday (5pm), Thursday (5pm), and Saturday (6pm)."
		);
	}

	if (command === "dad") {
		request(
			"https://icanhazdadjoke.com/slack",
			{ json: true },
			(err, res, body) => {
				if (err) {
					return console.log(err);
				}
				message.channel.send(body.attachments[0].text);
			}
		);
	}

	if (command === "bored") {
		request(
			"http://www.boredapi.com/api/activity/",
			{ json: true },
			(err, res, body) => {
				if (err) {
					return console.log(err);
				}
				message.channel.send(`${body.activity}! ${body.link}`);
			}
		);
	}

	if (command === "end" && raceStarted) {
		raceStarted = false;
		message.channel.send("Understood. Terminating your race promptly.");
	}
	if (command === "race" && !raceStarted) {
		raceText = startRace(message);
		raceStarted = true;
	} else if (raceStarted) {
		message.channel.send(
			`You already have an ongoing race. The text is ${raceText}`
		);
	}
});

client.login(process.env.TOKEN);
