let windows = require("../lib/windows");

module.exports = inject;

function inject(bot){
    bot.inventory = new windows.InventoryWindow(0, 'Inventory', 46);
    bot.handItems = new Array(2);
    bot.selectedHotbarSlot = null;
    bot.openedWindow = null;
    bot.hotbar = new Array(9);
    bot.armorItems = null;

    bot.client.on('window_items', packet => {
        if(packet.windowId == 0){
            bot.inventory.slots = packet.items;
            bot.handItems[1] = packet.items[45];
            bot.hotbar = packet.items.splice(36,9);
            bot.armorItems = packet.items.splice(5,4);
            bot.updateHeldItem();
            bot.emit('window_items', {id: 0, items: bot.inventory});
        }
    });

    bot.client.on('set_slot', packet => {
        if(packet.windowId == 0) {
            bot.inventory.updateSlot(packet.slot, packet.item);
            if(packet.slot <= 44 && packet.slot >= 36) {
                bot.hotbar[packet.slot-36] = packet.item;
                if(packet.slot-36 == bot.selectedHotbarSlot) {
                    bot.updateHeldItem();
                }
            } else if(packet.slot <= 8 && packet.slot >= 5) {
                bot.armorItems[packet.slot-5] = packet.item;
            }
        }
        //console.log(packet);
        bot.emit('set_slot', packet);
    });

    bot.client.on("held_item_slot", packet => {
        bot.selectedHotbarSlot = packet.slot;
        bot.updateHeldItem();
        bot.emit('held_item_slot', packet);
    });

    bot.updateHeldItem = () => bot.handItems[0] = bot.hotbar[bot.selectedHotbarSlot];
    bot.selectHotbarSlot = num => {bot.client.write('held_item_slot', {slotId: num}); bot.updateHeldItem();}
}