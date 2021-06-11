const fs = require("fs");
module.exports.config = {
name: "ngu",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Ngu như m =)",
	commandCategory: "NoCầnPrefix",
	usages: "ko cần prefix chỉ cần chat ngu",
	cooldowns: 5,
};
module.exports.event = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("ngu")==0 || (event.body.indexOf("Ngu")==0)) {
		var msg = {
				body: "Ngu thì chết, khóc lóc cái quần",
				attachment: fs.createReadStream(__dirname + `/cache/ngu.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
