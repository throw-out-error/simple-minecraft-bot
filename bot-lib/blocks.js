module.exports = bot => {
  const Chunk = require('prismarine-chunk')(bot.client.version)
  const Vec3 = require('vec3').Vec3
  const Block = require('prismarine-block')(bot.client.version)
  let XZkey = (x, z) => `${x}${z}`
  let columns = {}

  function setBlock(vec, block) {
    const chunkVec = new Vec3(
      Math.floor(vec.x / 16) * 16,
      0,
      Math.floor(vec.z / 16) * 16
    )
    const offsetVec = new Vec3(
      Math.abs(Math.floor(vec.x) % 16),
      Math.floor(vec.y),
      Math.abs(Math.floor(vec.z) % 16)
    )
    let chunk = columns[XZkey(chunkVec.x, chunkVec.z)]
    chunk.setBlock(offsetVec, block)
  }

  function getBlock(vec) {
    const chunkVec = new Vec3(
      Math.floor(vec.x / 16) * 16,
      0,
      Math.floor(vec.z / 16) * 16
    )
    const offsetVec = new Vec3(
      Math.abs(Math.floor(vec.x) % 16),
      Math.floor(vec.y),
      Math.abs(Math.floor(vec.z) % 16)
    )
    let chunk = columns[XZkey(chunkVec.x, chunkVec.z)]
    if (chunk == null) return null
    if (vec.y < 0) return new Block(0, 1, 0)

    return chunk.getBlock(offsetVec)
  }

  function delColumn(chunkX, chunkY) {
    const corner = new Vec3(chunkX * 16, 0, chunkY * 16)
    const key = XZkey(corner.x, corner.z)
    delete columns[key]
  }

  function addColumn(args) {
    const corner = new Vec3(args.x * 16, 0, args.z * 16)
    const key = XZkey(corner.x, corner.z)
    if (!args.bitMap) {
      delColumn(args.x, args.z)
      return
    }
    let column = columns[key]
    if (!column) columns[key] = column = new Chunk()

    try {
      column.load(args.data, args.bitMap, args.skyLightSent)
    } catch (e) {
      bot.emit('error', e)
      return
    }
  }

  bot.client.on('map_chunk_bulk', packet => {
    let offset = 0
    let meta
    let i
    let size
    for (i = 0; i < packet.meta.length; ++i) {
      meta = packet.meta[i]
      size =
        (8192 + (packet.skyLightSent ? 2048 : 0)) * onesInShort(meta.bitMap) +
        2048 * onesInShort(meta.bitMap) +
        256
      addColumn({
        x: meta.x,
        z: meta.z,
        bitMap: meta.bitMap,
        skyLightSent: packet.skyLightSent,
        groundUp: true,
        data: packet.data.slice(offset, offset + size),
      })
      offset += size
    }
  })

  bot.client.on('map_chunk', packet => {
    addColumn({
      x: packet.x,
      z: packet.z,
      bitMap: packet.bitMap,
      skyLightSent: true, // needs to be if the bot is in the overworld or not
      groundUp: packet.groundUp,
      data: packet.chunkData,
    })
  })

  bot.client.on('unload_chunk', packet => {
    delColumn(packet.x, packet.z)
  })

  bot.client.on('multi_block_change', packet => {
    let records = packet.records;
    for (let i = 0; i < records.length; i++) {
      record = records[i];
      X = (record.horizontalPos >> 4 & 15) + (packet.chunkX * 16);
      Y = record.y;
      Z = (record.horizontalPos & 15) + (packet.chunkZ * 16);
      pos = new Vec3(X, Y, Z)
      id = record.blockId;
      block = new Block(Math.floor(id / 16), 1, id % 16);
      setBlock(pos, block);
    }
  })

  bot.client.on('block_change', packet => {
    let id = packet.type
    let loc = packet.location
    let pos = new Vec3(loc.x, loc.y, loc.z)
    let block = new Block(Math.floor(id / 16), 1, id % 16)
    setBlock(pos, block)
    // console.log(getBlock(pos))
  })

  bot.world.setBlock = setBlock
  bot.world.getBlock = getBlock
}
