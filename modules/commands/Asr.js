const fs = require("fs");
module.exports.config = {
name: "asr",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "asr",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("asr")==0 || (event.body.indexOf("Asr")==0)) {
		var msg = {
				body: "Anh Sai Rồi-Sếp",
				attachment: fs.createReadStream(__dirname + `/noprefix/y2mate.com - Anh Sai Rồi   Sơn Tùng M TP   MV Lyrics HPĐ MUSIC.mp3`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
