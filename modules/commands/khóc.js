const fs = require("fs");
module.exports.config = {
name: "khóc",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Bảo Huy",
	description: "khóc",
	commandCategory: "Không cần dấu lệnh",
	usages: "cache",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Khóc")==0 || (event.body.indexOf("Hic")==0)) {
		var msg = {
				
				attachment: fs.createReadStream(__dirname + `/cache/received_3110834172468937.jpeg`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
