module.exports.config = {
	name: "resend",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Thọ",
	description: "Gửi lại những message/video/voice/photos đã được gỡ",
	commandCategory: "general", 
	usages: "resend",
	cooldowns: 0
};

module.exports.event = async function ({ event, api, client }) {
  let {messageID, senderID, threadID, body } = event;
  let settings = client.threadSetting.get(event.threadID) || {};
     if (!settings["resend"]) return;
     if (!client.message) client.message = new Array();	
     if(event.type != "message_unsend") client.message.push({
        msgID:messageID,
        msgBody:body,
        attachment:event.attachments
      })
    if(event.type == "message_unsend") {
      if(!client.message.some(item => item.msgID == messageID)) return;
      var getMsg = client.message.find(item => item.msgID == messageID);
     let name = (await api.getUserInfo(event.senderID))[senderID].name;
      if(getMsg.msgBody != "") return api.sendMessage(`Con lợn ${name} đã cố xóa 1 tin nhắn nhưng làm sao mà xóa được với tốc độ cào phím của bot !!!.\nVới nội dung: ${getMsg.msgBody}`,threadID)
      else {
            let num = 0
            let msg = `Vợ yêu ${name} vừa gỡ ${getMsg.attachment.length} tệp đính kèm:\n`
          for (var i = 0; i < getMsg.attachment.length; i++) {
        var shortLink = await require("tinyurl").shorten(getMsg.attachment[i].url);
        num +=1;
        msg += `${num}: ${shortLink}\n`;
    	}
        api.sendMessage(msg,threadID);
        }
     
      }
}

module.exports.run = async ({ event, api, args, Threads, client, utils }) => {
    if (args.length == 0) return api.sendMessage("Input không được để trống", event.threadID, event.messageID);
    let settings = (await Threads.getData(event.threadID)).settings;
    switch (args[0]) {
        case "on": {
            settings["resend"] = true;
            await Threads.setData(event.threadID, options = { settings });
            client.threadSetting.set(event.threadID, settings);
            api.sendMessage("Đã bật resend thành công!", event.threadID);
            break;
        }
        case "off": {
            settings["resend"] = false;
            await Threads.setData(event.threadID, options = { settings });
            client.threadSetting.set(event.threadID, settings);
            api.sendMessage("Đã tắt resend thành công!", event.threadID);
            break;
        }
    
        default: {
            utils.throwError("resend", event.threadID, event.messageID);
            break;
        }
    }
}
