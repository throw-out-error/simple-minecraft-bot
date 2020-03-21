# Simple Minecraft Bot

## Documentation
To import the bot library and create a bot, simply type:
```javascript
const { Bot, } = require("simple-minecraft-bot")
var bot = new Bot()
```
Next, you'll want to connect the bot to a minecraft server. You can do this by running bot.connect()
```javascript
bot.connect({
    host: "localhost",
    port: 25565,
    username: "joe",
    password: "1234" // optional (not needed for cracked servers)
    version: "1.12.2"
});
```
Then you'll probably want to load the core libraries into the bot object:
```javascript
bot.loadCoreLibraries();
```

You can also load other libaries as well by using
```javascript
bot.loadLibraries([
    libary1,
    library2
]);
```