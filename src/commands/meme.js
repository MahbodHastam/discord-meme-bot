module.exports = {
  name: "meme",
  description: "send random memes from reddit",
  emojis: {
    joy: "😂",
    disslike: "👎",
    again: "🔄",
  },
  url(limit = 1) {
    return `https://www.reddit.com/r/meme/hot/.json?limit=${limit}`;
  },
  execute(message, args) {
    // console.log(args);
    // const client = message.client;
    this.sendMemes(message, args);
  },
  sendMemes(message, args) {
    const fetch = require("node-fetch");
    const counter = args[1] ?? 1;
    for (j = 0; j < counter; j++) {
      let i = Math.floor((Math.random() * 100) / 2);
      fetch(this.url(i))
        .then((res) => res.json())
        .then((res) => {
          const url = res.data.children[i].data.url;
          message.channel.send(url).then((msg) => {
            msg.react(this.emojis.joy);
            msg.react(this.emojis.disslike);
            msg.react(this.emojis.again);
          });
        });
    }
  },
};
