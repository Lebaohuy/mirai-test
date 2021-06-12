const fs = require("fs");
module.exports.config = {
name: "Hi",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Hi",
	commandCategory: "Không cần dấu lệnh",
	usages: "cache",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Hi")==0 || (event.body.indexOf("hi")==0) || (event.body.indexOf("Hello")==0) || (event.body.indexOf("hello")==0)) {
		var msg = {
				body: "Chào bạn chúc bạn một ngày tốt lành UwU",
				attachment: fs.createReadStream(__dirname + `/cache/hi.gif`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
