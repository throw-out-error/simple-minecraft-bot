// TODO; make nodecraft-data a seperate package
module.exports = (version) => {
    ver = Number(version);
    data = {
        blocks: require(`./data/1.7-1.12/blocks.json`),
        effects: require(`./data/1.7-1.12/effects.json`),
        enchantments: require(`./data/1.7-1.12/enchantments.json`),
        entities: require(`./data/1.7-1.12/blocks.json`),
        items: require(`./data/1.7-1.12/items.json`)
    }
    
    for(datatype of Object.keys(data)) {
        data[datatype+'ById'] = {}
        data[datatype+'ByName'] = {}
        for(obj of data[datatype]){
            data[datatype+'ById'][obj.id] = obj
            data[datatype+'ByName'][obj.name] = obj
        }
    }

    data.materials = require(`./data/1.7-1.12/materials.json`);

    return data
}

//console.log(loader(1.12).enchantmentsByName['mending']);