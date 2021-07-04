module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "SpermLord",
	description: "Listen events"
};

module.exports.run = async function({ api, event, Users, Threads, client }) {
	let msg, formPush
	const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	let settings = client.threadSetting.get(event.threadID) || {};//(await Threads.getData(event.threadID)).settings;
	let name = (await Users.getData(event.logMessageData.leftParticipantFbId)).name || (await api.getUserInfo(event.logMessageData.leftParticipantFbId))[event.logMessageData.leftParticipantFbId].name
	let type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
	(typeof settings.customLeave == "undefined") ? msg = "Con vợ {name} vì không tán đổ em nào nên đã {type} khỏi nhóm. Chúc bé ra đi bình an❤" : msg = settings.customLeave;
	msg = msg
	.replace(/\{name}/g, name)
	.replace(/\{type}/g, type);
	let dirGif = __dirname + `/cache/leaveGif/`;
	if (existsSync(dirGif)) mkdirSync(dirGif, { recursive: true })
	if (existsSync(dirGif + `FB_IMG_16254178983628499.jpg`)) formPush = { body: msg, attachment: createReadStream(dirGif + `FB_IMG_16254178983628499.jpg`) }
	else formPush = { body: msg }
	return api.sendMessage(formPush, event.threadID);
}
