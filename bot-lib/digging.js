module.exports = inject;

function inject(bot){

    digTime = block => {
        data = require('../nodecraft-data/main')(bot.majorVersion);
        blocks = data.blocksById
        materials = data.materials
        if(!blocks[block].diggable) return;
        hardness = blocks[block].hardness;
        tools = materials[blocks[block].material];
        console.log(blocks[block].material)
        penalty = 5;
        toolSpeed = 1;
        if(tools.hasOwnProperty(bot.handItems[0].blockId)) penalty = 1.5/tools[bot.handItems[0].blockId];
        return hardness*penalty*1000
    }

    dig = block => {
        bot.emit('dig', block)
    }

    startDigging = block => {
        bot.client.write('block_dig', {
            status: 0,
            location: block.pos,
            face: 1
        });
    }

    stopDigging = block => {
        bot.client.write('block_dig', {
            status: 2,
            location: block.pos,
            face: 1
        });
    }

    bot.on('dig', block => {
        startDigging(block)
        setTimeout(()=>{stopDigging(block)}, digTime(block.id));
    });
    
    bot.dig = dig;
}