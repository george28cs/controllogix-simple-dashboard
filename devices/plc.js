const { Controller, Tag } = require("ethernet-ip")
const tagsService = require('../services/routeServices/tags')
const { plcIp } = require('../config')
const { saveTag } = require('../services/plcServices/tagStorage')

const controller_slot = 2

const initPLC = async () => {
  try {
    const PLC = new Controller();
    const tags =  await tagsService.getTags()

    for (let tag of tags) {
      if (tag.scope === 'controller') {
        PLC.subscribe(new Tag(tag.name))
      } else {
        PLC.subscribe(new Tag(tag.name, tag.scope))
      }
    }

    await PLC.connect(plcIp, controller_slot)

    console.log(`Connected to ${PLC.properties.name} Controller`)

    PLC.scan()
      .catch(error => {
        console.error('Scan Error', error)
        PLC.destroy()
        setTimeout(initPLC, 5000)
      })

    PLC.forEach(tag => {
      tag.on("Initialized", tag => saveTag(tag.name, tag.value) );
      tag.on("Changed", tag => saveTag(tag.name, tag.value) );
    })

    PLC.on('error', (error) => console.error(error))
    PLC.on('close', () => console.log('An error was ocurred, reconnecting...'))
    PLC.on('end', () => {
      console.log('PLC Disconnected')
      initPLC()
    })

    PLC.on('timeout', () => console.log('Tag timeout'))

  } catch (error) {
    if (error.message){
      console.error(error.message)
    } else {
      console.log(error)
    }
    setTimeout(initPLC, 5000)
  }
}
module.exports = initPLC