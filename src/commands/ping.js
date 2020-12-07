module.exports = {
    name: "ping",
    description: "Ping pong!",
    execute(message, args) {
        message.channel.send(`pong!`);
    },
};