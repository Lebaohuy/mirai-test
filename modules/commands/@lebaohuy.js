const fs = require("fs");
module.exports.config = {
	name: "@Lê Bảo Huy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "thọ", 
	description: "no prefix",
	commandCategory: "System",
	usages: "@Lê Bảo Huy",
    cooldowns: 1, 
};

module.exports.event = async ({ event, api, Currencies,Users, args, utils }) => {
if (event.body.indexOf("@Lê Bảo Huy")==0 || (event.body.indexOf("@Lê Bảo Huy")==0)) {
		return api.sendMessage(`Tag BOT có gì hông :3` , event.threadID, event.messageID)
		}
};


module.exports.run = async ({ event, api, Currencies, args, utils }) => {






	}
