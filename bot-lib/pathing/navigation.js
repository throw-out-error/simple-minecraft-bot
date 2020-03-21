const Node = require("../../lib/node");
const Vec3 = require('vec3').Vec3;
const dist = (loc1, loc2) => Math.sqrt((loc1.x - loc2.x) ** 2 + (loc1.y - loc2.y) ** 2 + (loc1.z - loc2.z) ** 2);

module.exports = bot => {
    var grid = [];
    bot.on("navigate", (pos) => {
        /* if(bot.currentChunk != null) {
            if(dist(bot.pos, pos) <= 16) {
                
            }
        } */
    });
};