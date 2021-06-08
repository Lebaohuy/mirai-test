module.exports.config = {
	name: "gai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Ảnh gái",
	commandCategory: "Hình Ảnh",
	usages: "gai",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://api.berver.tech/gai2k').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						body: `Ảnh gái 🥳🥳`,
						attachment: fs.createReadStream(__dirname + `/cache/gaivn.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/gaivn.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/gaivn.${ext}`)).on("close", callback);
			})
}
