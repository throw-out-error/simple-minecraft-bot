let mc = require('minecraft-protocol')
let EventEmitter = require('events')
const coreLibraries = {
    info: './bot-lib/info',
    inventory: './bot-lib/inventory',
    digging: './bot-lib/digging',
    respawn: './bot-lib/respawn',
    blocks: './bot-lib/blocks',
    physics: './bot-lib/physics',
}

module.exports = {
    Bot: class Bot extends EventEmitter {
        constructor() {
            super()
            this.isAlive = false
            this.client = null
        }

        connect(options) {
            this.client = mc.createClient(options)
            this.client.on('connect', () => {
                this.username = this.client.username
                this.version = options.version
                this.majorVersion = options.version.match(/(\d\.\d+)\.\d/)[1]
                this.emit('connect')
            })
            this.client.on('end', reason => {
                this.emit('end', reason)
            })
        }

        refreshPos() {
            bot.client.write('position', {
                x: bot.pos.x,
                y: bot.pos.y,
                z: bot.pos.z,
                onGround: false,
            })
        }

        loadLibrary(name) {
            require(name)(this);
        }

        loadLibraries(names) {
            for (let name in names) {
                this.loadLibrary(names[name])
            }
        }

        loadCoreLibraries() {
            this.loadLibraries(coreLibraries)
        }
    },
    libraries: coreLibraries,
}
