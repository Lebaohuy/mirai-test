const fs = require("fs");
module.exports.config = {
    name: "Rời bỏ",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Bảo Huy",
	description: "rời bỏ",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("rời bỏ")==0 || (event.body.indexOf("Rời bỏ")==0)) {
		var msg = {
				body: "Và Anh Tự Biết Rằng Mình Là Ai, Có Tư Cách Gì Để Mong Tình Cảm Từ 1 trái tim đang thuộc về người khác....",
				attachment: fs.createReadStream(__dirname + `/cache/y2mate.com - 180524 Rời bỏ Cover ERIK Swing lounge The 5th minishow_320kbps.mp3`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
