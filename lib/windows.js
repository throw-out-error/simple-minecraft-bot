let util = require('util');
let assert = require('assert');
let EventEmitter = require('events').EventEmitter;

var INVENTORY_SLOT_COUNT = 36;

module.exports = {
    Window: Window,
    InventoryWindow: InventoryWindow
}

util.inherits(Window, EventEmitter);
function Window(id, type, title, slotCount) {
  this.id = id;
  this.type = type;
  this.title = title;
  this.slots = new Array(slotCount);
  this.selectedItem = null;
}

Window.prototype.updateSlot = function(slot, newItem) {
    if(newItem) newItem.slot = slot;
    var oldItem = this.slots[slot];
    this.slots[slot] = newItem;
    this.emit("windowUpdate", slot, oldItem, newItem);
};

Window.prototype.findItemRange = function(start, end, itemType, metadata, notFull) {
    assert.notEqual(itemType, null);
    for(var i = start; i < end; ++i) {
      var item = this.slots[i];
      if(item && itemType === item.type &&
        (metadata == null || metadata === item.metadata) &&
        (!notFull || item.count < item.stackSize)) {
        return item;
      }
    }
    return null;
};

Window.prototype.findInventoryItem = function(itemType, metadata, notFull) {
    assert.ok(this.inventorySlotStart != null);
    var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
    return this.findItemRange(this.inventorySlotStart, end, itemType, metadata, notFull);
};

Window.prototype.firstEmptySlotRange = function(start, end) {
    for(var i = start; i < end; ++i) {
      if(!this.slots[i]) return i;
    }
    return null;
};
Window.prototype.firstEmptyInventorySlot = function() {
    var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
    return this.firstEmptySlotRange(this.inventorySlotStart, end);
};

function InventoryWindow(id, title, slotCount) {
    Window.call(this, id, null, title, slotCount);
}
util.inherits(InventoryWindow, Window);

InventoryWindow.prototype.inventorySlotStart = 9;
