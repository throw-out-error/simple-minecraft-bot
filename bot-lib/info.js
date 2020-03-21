let Vec3 = require('Vec3');
module.exports = bot => {
    bot.entity = {}
    bot.server = {}
    bot.world = {}
    bot.client.on('login', packet => {
        bot.entity.id = packet.entityId;
        bot.entity.gameMode = packet.gameMode;
        bot.entity.dimension = packet.dimension;
        bot.entity.velocity = new Vec3(0, 0, 0);
        bot.entity.position = new Vec3(0, 0, 0);

        bot.server.maxPlayers = packet.maxPlayers;

        bot.world.levelType = packet.levelType;
        bot.world.difficulty = packet.difficulty;
    })
}
