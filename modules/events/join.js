module.exports.config = {
	name: "join",
	eventType: ["log:subscribe"],
	version: "1.0.0",
	credits: "SpermLord",
	description: "Listen events",
	dependencies: ["request", "fs-extra"]
};

module.exports.run = async function({ api, event, __GLOBAL, client }) {
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${__GLOBAL.settings.PREFIX} ] • ${(!__GLOBAL.settings.BOTNAME) ? "Made by CatalizCS and SpermLord" : __GLOBAL.settings.BOTNAME}`, event.threadID, api.getCurrentUserID());
		const fs = require("fs");
		var msg = {
				body: "Bot đã được kết nối thành công 😍.\nVui lòng sử dụng +help để xem tất cả các lệnh ❤❤.\nCảm ơn Box của các bạn đã sử dụng Bot của Lê Bảo Huy UwU😍",
				attachment: fs.createReadStream(__dirname + `/cache/joinGif/lana.gif`)
			}
			api.sendMessage(msg, event.threadID, event.messageID);
		}
	else {
		const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
		let threadInfo = await api.getThreadInfo(event.threadID),
			threadName = threadInfo.threadName,
			settings = client.threadSetting.get(event.threadID) || {},
			dirGif = __dirname + `/cache/joinGif/`,
			msg, formPush;
		var mentions = [], nameArray = [], memLength = [];
		for (var i = 0; i < event.logMessageData.addedParticipants.length; i++) {
			let id = event.logMessageData.addedParticipants[i].userFbId;
			let userName = event.logMessageData.addedParticipants[i].fullName;
			nameArray.push(userName);
			mentions.push({ tag: userName, id });
			memLength.push(threadInfo.participantIDs.length - i);
		}
		memLength.sort((a, b) => a - b);
		
		(typeof settings.customJoin == "undefined") ? msg = "Con lợn mới tên {name} đã gia nhập vào Box toàn Lợn .\nChào mừng con lợn đã đến với box {threadName}.\n{type} Con lợn là thành viên thứ {soThanhVien} của nhóm 🥳. Đéo tt=bay acc 🙃. Chúc con lợn có những phút giây vui vẻ ở box toàn những con Lợn nhựa nha uwu❤️" : msg = settings.customJoin;
		msg = msg
		.replace(/\{name}/g, nameArray.join(', '))
		.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : '')
		.replace(/\{soThanhVien}/g, memLength.join(', '))
		.replace(/\{threadName}/g, threadName);
		if (existsSync(dirGif)) mkdirSync(dirGif, { recursive: true });
		if (existsSync(dirGif + `received_1213055775809701.gif`)) formPush = { body: msg, attachment: createReadStream(dirGif + `received_1213055775809701.gif`), mentions }
		else formPush = { body: msg, mentions }
		return api.sendMessage(formPush, event.threadID);
	}
}
