const fs = require("fs");
module.exports.config = {
name: "Acv",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Acv",
	commandCategory: "Không cần dấu lệnh",
	usages: "cache",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("acv")==0 || (event.body.indexOf("Acv")==0)) {
		var msg = {
				body: "Anh đã từng cố gắng vun đắp cho tình yêu của mình =)",
				attachment: fs.createReadStream(__dirname + `/cache/179446594_806213230014432_5393630848267114513_n.mp4`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
