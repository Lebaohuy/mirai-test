const fs = require("fs");
module.exports.config = {
    name: "ttnca",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Bảo Huy",
	description: "ttnca",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Mrmsc")==0 || (event.body.indexOf("mrmsc")==0)) {
		var msg = {
				body: "Trong Trí nhớ của anh....",
				attachment: fs.createReadStream(__dirname + `/cache/y2mate.com - 170113 ERIK livestream on IG Cover Trong trí nhớ của anh.mp3 `)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
