const db = require('../database')
const stringTable = 'string_tag'
const floatTable = 'float_tag'
const booleanTable = 'boolean_tag'
const integerTable = 'integer_tag'
const requestHistoryTable = 'request_history'

module.exports.saveTag = async (tag, value) => {
  try {
    const isProgramTag = tag.includes('Program:')
    const scope = isProgramTag ? tag.match(/(?<=\:)(.*?)(?=\.)/, '')[1] : 'controller'
    const name = isProgramTag ? tag.replace(/(.*?\.)/, '') : tag;
    const data = {
      name,
      scope
    }
    const dbTag = await db.tags.getTagInfo(data)

    if (dbTag.length === 1) {

      const dataToSave = {
        tag_id: dbTag[0].id,
        value,
        created_on: new Date()
      }

      switch (dbTag[0].type_id) {
        case 1: 
          {
            const requestId = await storeTag(stringTable, dataToSave)
            publishTag(requestId[0], { 
              ...data,
              value,
              type_id: dbTag[0].type_id,
              created_on: dataToSave.created_on
            })
            return
          }
        case 2:
          {
            const requestId = await storeTag(booleanTable, dataToSave)
            publishTag(requestId[0], { 
              ...data,
              value,
              type_id: dbTag[0].type_id,
              created_on: dataToSave.created_on
            })
            return
          }
        case 3:
          {
            const requestId =  await storeTag(floatTable, dataToSave)
            publishTag(requestId[0], { 
              ...data,
              value,
              type_id: dbTag[0].type_id,
              created_on: dataToSave.created_on
            })
            return
          }
        case 4:
          {
            const requestId =  await storeTag(integerTable, dataToSave)
            publishTag(requestId[0], { 
              ...data,
              value,
              type_id: dbTag[0].type_id,
              created_on: dataToSave.created_on
            })
            return
          }
      }
      return true
    } else {
      console.error(' An error ocurred on tag saving')
    }
  } catch (error) {
    console.error(error)
  }
}

const storeTag = async (table, data) => {
  try {
    return await db.tags.insertTagValue(data, table)
  } catch (error) {
    console.error(error)
  }
}

const publishTag = async (requestId, tag) => {
  try {
    const mqtt = require('../../mqtt')
    if (mqtt.connected) {
      const data = {
        ...tag,
        request_id: requestId
      }
      const mqttData = JSON.stringify(data)
      mqtt.publish('newTag', mqttData)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.getQueueTags = async () => {
 try {
  return await db.tags.getQueueTag()
 } catch (error) {
  console.error(error)
 }
}

module.exports.markTagAsSent = async id => {
  try {
   return await db.common.update(requestHistoryTable, { status: 'sent' }, { id } )
  } catch (error) {
   console.error(error)
  }
 }