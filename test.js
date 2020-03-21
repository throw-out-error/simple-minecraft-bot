let mc = require("minecraft-protocol");
const { Bot } = require("./bot")
const ip = process.argv[2].split(":");
const { dist } = require("./lib/math");

var bot = new Bot()
bot.connect({
    host: ip[0],
    port: parseInt(ip[1]),
    username: process.argv[3],
    version: "1.12.2"
});

bot.loadCoreLibraries();

bot.client.on('error', err => {
    console.log(err);
});

/*bot.client.on("position", packet => {
    bot.pos = { x: packet.x, y: packet.y, z: packet.z }
    bot.client.write('teleport_confirm', { teleportId: packet.teleportId })
});*/


bot.client.on('block_change', (packet) => {
    /*if (packet.type != 0 && dist(bot.pos, packet.location) <= 5) {
        bot.controlState.sneak = true;
        //bot.pos.x++
        //refreshPos();
        //bot.dig({id: Math.floor(packet.type/16), pos: packet.location});
    }*/
});