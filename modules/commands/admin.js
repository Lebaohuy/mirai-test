module.exports.config = {
	name: "admin",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "HungCatMoi",
	description: "Quản lý admin bot",
	commandCategory: "Info", 
	usages: "admin [danh sách/thêm/xóa] [args]", 
	cooldowns: 5,
	info: [
		{
			key: '1,2',
			prompt: 'Xem và liên hệ với admin bot',
			type: 'String'
		},
        {
			key: 'thêm (dành riêng cho Admin)',
			prompt: 'Thêm admin vào danh sách admin, có thể sử dụng tag, reply',
			type: 'String',
			example: '10000000'
		},
        {
			key: 'xóa(danh riêng cho Admin',
			prompt: 'Xóa admin khỏi danh sách admin, có thể sử dụng tag, reply',
			type: 'String',
			example: '10000000'
		}
	], 
};

module.exports.run = async ({ api, event, __GLOBAL, args, permssion, utils, client, Users }) => {
	const { writeFileSync } = require("fs-extra");
	var config = require(client.dirConfig);
	if (args.join() == "") {api.sendMessage("Hiện tại bot đang có 2 Admin\n👉Sử dụng 1 để xem tt admin 1\n👉Sử dụng 2 để xem tt admin 2",event.threadID, event.messageID);
	}
	if (args[0] == "1") {
		return api.sendMessage("==== Admin 1 ====\nTên: Nguyễn Văn Hùng\nLiên hệ:\nhttps://www.facebook.com/dz30cm/", event.threadID, event.messageID);
	}
	else if (args[0] == "2") {
		return api.sendMessage("==== Admin 2 ====\nTên: Nguyễn Quốc Việt\nLiên hệ:\nhttps://www.facebook.com/VietDz30cm", event.threadID, event.messageID);
	}
	else if (args[0] == "thêm") {
        if (event.type == "message_reply") {
            __GLOBAL.settings.ADMINBOT.push(event.messageReply.senderID);
            config.ADMINBOT.push(event.messageReply.senderID);
            const name = (await Users.getData(event.messageReply.senderID)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã thêm người dùng vào admin bot:\n+ [ ${event.messageReply.senderID} ] » ${name}`, event.threadID, event.messageID);
        }
        else if (Object.keys(event.mentions).length !== 0) {
            var listAdd = [];
            const mention = Object.keys(event.mentions);
            for (const id of mention) {
                __GLOBAL.settings.ADMINBOT.push(id);
                config.ADMINBOT.push(id);
                listAdd.push(`+ [ ${id} ] » ${event.mentions[id]}`);
            }
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã thêm người dùng vào admin bot:\n${listAdd.join("\n").replace(/\@/g, "")}`, event.threadID, event.messageID);
        }
        else if (content.length != 0 && !isNaN(content)) {
            __GLOBAL.settings.ADMINBOT.push(content);
            config.ADMINBOT.push(content);
            const name = (await Users.getData(content)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã thêm người dùng vào admin bot:\n+ [ ${content} ] » ${name}`, event.threadID, event.messageID);
        }
        else return utils.throwError(this.config.name, event.threadID, event.messageID);
    }
    else if (args[0] == "xóa") {
        if (event.type == "message_reply") {
            const index = config.ADMINBOT.findIndex(item => item == event.messageReply.senderID);
            if (index == -1) return api.sendMessage(`[Admin] Người dùng mang id ${event.messageReply.senderID} không tồn tại trong admin bot!`, event.threadID, event.messageID);
            __GLOBAL.settings.ADMINBOT.splice(index, 1);
            config.ADMINBOT.splice(index, 1);
            const name = (await Users.getData(event.messageReply.senderID)).name || "Người dùng facebook";
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã xóa người dùng khỏi admin bot:\n- [ ${event.messageReply.senderID} ] » ${name}`, event.threadID, event.messageID);
        }
        else if (event.mentions.length != 0) {
            var listAdd = [];
            const mention = Object.keys(event.mentions);
            for (const id of mention) {
                const index = config.ADMINBOT.findIndex(item => item == id);
                if (index == -1) return api.sendMessage(`[Admin] Người dùng mang id ${id} không tồn tại trong admin bot!`, event.threadID, event.messageID);
                __GLOBAL.settings.ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                listAdd.push(`- [ ${id} ] » ${event.mentions[id]}`);
            }
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã xóa người dùng khỏi admin bot:\n${listAdd.join("\n").replace(/\@/g, "")}`, event.threadID, event.messageID);
        }
        else if (!isNaN(content)) {
            const index = config.ADMINBOT.findIndex(item => item == event.messageReply.senderID);
            if (index == -1) return api.sendMessage(`[Admin] Người dùng mang id ${content} không tồn tại trong admin bot!`, event.threadID, event.messageID);
            __GLOBAL.settings.ADMINBOT.splice(index, 1);
            config.ADMINBOT.splice(index, 1);
            const name = (await Users.getData(content)).name
            writeFileSync(client.dirConfig , JSON.stringify(config, null, 4), 'utf8');
            return api.sendMessage(`[Admin] Đã xóa người dùng khỏi admin bot:\n- [ ${content} ] » ${name}`, event.threadID, event.messageID);
        }
        else return utils.throwError(this.config.name, event.threadID, event.messageID);
    }
    else return utils.throwError(this.config.name, event.threadID, event.messageID);
}
