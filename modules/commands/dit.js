const request = require('request');
const fs = require('fs')

module.exports.config = {
  name: "dit",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "VanHung",
  description: "Địt người bạn Tag",
  commandCategory: "general",
  usages: "dit [tag người bạn cần ôm]",
  cooldowns: 5,
  dependencies: ["request","fs"]
};

module.exports.run = function({
  api,
  event,
  args,
  client,
  __GLOBAL
}) {
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join(" ")) return out("Bạn chưa nhập tin nhắn");
  else
  return request('https://api-teamvanminh.cf/dit.php', (err, response, body) => {
    let picData = JSON.parse(body);
    var mention = Object.keys(event.mentions)[0];
    let getURL = picData.url;
    let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
    let tag = event.mentions[mention].replace("@", "");
    let callback = function() {
      api.sendMessage({
        body: tag + ", đã bị Địt  😈",
        mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
        attachment: fs.createReadStream(__dirname + `/src/11.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/src/11.${ext}`), event.messageID);
    };
    request(getURL).pipe(fs.createWriteStream(__dirname + `/src/11.${ext}`)).on("close", callback);
  });
}
