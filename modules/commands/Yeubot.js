const fs = require("fs");
module.exports.config = {
name: "Yêu Bot",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Yêu Bot",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Yêu Bot")==0 || (event.body.indexOf("yêu Bot")==0)) {
		var msg = {
				body: "Cảm ơn rất nhiều hihi, Bot cũng yêu bạn 😘",
				attachment: fs.createReadStream(__dirname + `/cache/tks.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
