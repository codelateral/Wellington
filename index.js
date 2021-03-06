require("dotenv").config();
// feature/command imports
import bored from "./features/bored";
import startRace from "./features/codeRace";
import dad from "./features/dad";
import help from "./features/help";
import schedule from "./features/schedule";
import decide from "./features/decide";
import checkForTriggers from "./features/checkForTriggers";
import handle_playlist from "./backend/main";

// discord.js boilerplate
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";

client.once("ready", () => {
	console.log("Sir Wellington is at your service ;)");
});

let raceStarted = false;
let raceText = null;
let raceChannel = null;
client.on("message", (message) => {
	if (message.author.bot) return;
	// outlier checks
	checkForTriggers(message);

	// race checks
	if (
		raceStarted &&
		raceChannel === message.channel &&
		message.content !== "!race" &&
		message.content !== "!end"
	) {
		if (message.content === raceText) {
			message.reply(`Congratulations, you have won.`);
			raceText = null;
			raceStarted = false;
			raceChannel = null;
		} else {
			let shorterWord;
			let longerWord;
			if (raceText.length > message.content.length) {
				longerWord = raceText.split("");
				shorterWord = message.content.split("");
			} else {
				longerWord = message.content.split("");
				shorterWord = raceText.split("");
			}
			let count = 0;
			for (let i = 0; i < shorterWord.length; i++) {
				if (shorterWord[i] !== longerWord[i] && count === 0) {
					shorterWord[i] = "#";
					count++;
				}
			}
			let correctionString = shorterWord.join("").split("#")[0];
			message.channel.send(
				`
				I'm sorry, that's not correct. I've placed a '#' at the first error I found
**${correctionString}#**
				`
			);
		}
	}

	// begin regular commands
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
		case "commands":
		case "help":
			help(message);
			break;
		case "decide":
			decide(message, args);
			break;
		case "schedule":
			schedule(message);
			break;
		case "dad":
			dad(message);
			break;
		case "bored":
			bored(message);
			break;
		case "playlist":
		case "add":
		case "delete":
			handle_playlist(message, command, args);
			break;
	}

	if (command === "end" && raceStarted) {
		raceStarted = false;
		raceChannel = null;
		message.channel.send("Understood. Terminating your race promptly.");
	}

	// checks for trying to start a race while there is an ongoing race
	if (command === "race" && !raceStarted) {
		raceText = startRace(message);
		raceStarted = true;
		raceChannel = message.channel;
	} else if (raceStarted) {
		message.channel.send(
			`You already have an ongoing race. The text is ${raceText}`
		);
	}
});

client.login(process.env.TOKEN);
