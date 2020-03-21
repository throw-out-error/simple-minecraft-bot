module.exports = bot => {
    // Health/respawn handler
    bot.isAlive = true
    bot.client.on('respawn', (packet) => {
        bot.isAlive = false
        bot.emit('respawn')
    })
    
    bot.client.once('update_health', (packet) => {
        if (packet.health > 0) {
            bot.emit('spawn')
        }
    })
    
    bot.client.on('update_health', (packet) => {
        bot.health = packet.health
        bot.food = packet.food
        bot.foodSaturation = packet.foodSaturation
        bot.emit('health')
        if (bot.health <= 0) {
            bot.isAlive = false
            bot.emit('death')
            bot.client.write('client_command', { payload: 0 })
        } else if (bot.health > 0 && !bot.isAlive) {
            bot.isAlive = true
            bot.emit('spawn')
        }
    });
}