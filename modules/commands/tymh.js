const fs = require("fs");
module.exports.config = {
name: "tymh",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "tymh",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("tymh")==0 || (event.body.indexOf("Tymh")==0)) {
		var msg = {
				body: "Tình Yêu Màu Hồng",
				attachment: fs.createReadStream(__dirname + `/noprefix/y2mate.com - Tình Yêu Màu Hồng Orinn Remix  Hồ Văn Quý x Xám  Nhạc Trẻ Remix EDM Tik Tok Gây Nghiện Hay Nhất.mp3`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
