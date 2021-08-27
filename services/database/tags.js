const knex = require('./knex')
const tagTypesTable = 'tag_type'
const tagTable = 'tag'
const stringTable = 'string_tag'
const floatTable = 'float_tag'
const booleanTable = 'boolean_tag'
const integerTable = 'integer_tag'
const requestHistoryTable = 'request_history'
const db = require('./index')

const getTags = async () => {
  try {
    return knex(tagTable)
      .select(tagTable + '.*', tagTypesTable + '.type')
      .join(tagTypesTable, tagTable + '.type_id', tagTypesTable + '.id')
      .orderBy(tagTable + '.id',)
      .where(tagTable + '.is_deleted', false)
  } catch (error) {
    throw new Error (error)
  }
}

const getLastValue = async () => {
  try {
    const tags = await knex(tagTable)
      .select(`${tagTable}.id`, `${tagTable}.name`, `${tagTable}.scope`, `type_id`, tagTypesTable + '.type')
      .join(tagTypesTable, tagTable + '.type_id', tagTypesTable + '.id')
      .where(`${tagTable}.is_deleted`, false)
    
    for (let tag of tags) {
      if (tag.type_id === 1) {
        const value = await tagValue(stringTable, tag.id)
        tag.value = value.length > 0 ? value[0].value : null
        tag.date = value.length > 0 ? value[0].created_on : null
      }
      if (tag.type_id === 2) {
        const value = await tagValue(booleanTable, tag.id)
        tag.value = value.length > 0 ? value[0].value : null
        tag.date = value.length > 0 ? value[0].created_on : null
      }
      if (tag.type_id === 3) {
        const value = await tagValue(floatTable, tag.id)
        tag.value = value.length > 0 ? value[0].value : null
        tag.date = value.length > 0 ? value[0].created_on : null
      }
      if (tag.type_id === 4) {
        const value = await tagValue(integerTable, tag.id)
        tag.value = value.length > 0 ? value[0].value : null
        tag.date = value.length > 0 ? value[0].created_on : null
      }
    }
    return tags
  } catch (error) {
    throw new Error (error)
  }
}

const tagValue = (table, id) => {
  try {
    return knex(table)
    .select('value', 'created_on')
    .where('tag_id', id)
    .where('is_deleted', false)
    .orderBy('created_on', 'DESC')
    .limit(1)
  } catch (error) {
    throw new Error(error)
  }
}

const getTagInfo = async (data) => {
  try {
    return knex(tagTable)
      .select(tagTable + '.*', tagTypesTable + '.type')
      .where(data)
      .join(tagTypesTable, tagTable + '.type_id', tagTypesTable + '.id')
      .where(tagTable + '.is_deleted', false)
  } catch (error) {
    throw new Error (error)
  }
}

const insertTagValue = async (data, typeTable) => {
  try {
    return await knex.transaction( async trx => {
      const valueId = await trx(typeTable)
        .insert(data)
      const requestHistoryData = {
        tag_id: data.tag_id,
        value_id: valueId[0]
      }
      const requestId = await trx(requestHistoryTable).insert(requestHistoryData)
      return requestId
    })
  } catch (error) {
    throw new Error (error)
  }
}

const getQueueTag = async () => {
  try {
    const queueTags = await knex(requestHistoryTable)
      .select(`${requestHistoryTable}.id as request_id`, `${requestHistoryTable}.value_id`, `${tagTable}.name`, `${tagTable}.scope`, `${tagTable}.type_id`)
      .join(tagTable, `${tagTable}.id`,`${requestHistoryTable}.tag_id`)
      .where(`${requestHistoryTable}.status`, 'queued')
      .where(`${requestHistoryTable}.is_deleted`, false)
      .orderBy(`${requestHistoryTable}.id`)
    for (let queueTag of queueTags) {
      if (queueTag.type_id === 1) {
        const value = await db.common.get(stringTable, { id: queueTag.value_id})
        queueTag.value = value.length > 0 ? value[0].value : null
        queueTag.created_on = value.length > 0 ? value[0].created_on : null
      }
      if (queueTag.type_id === 2) {
        const value = await db.common.get(booleanTable, { id: queueTag.value_id})
        queueTag.value = value.length > 0 ? value[0].value : null
        queueTag.created_on = value.length > 0 ? value[0].created_on : null
      }
      if (queueTag.type_id === 3) {
        const value = await db.common.get(floatTable, { id: queueTag.value_id})
        queueTag.value = value.length > 0 ? value[0].value : null
        queueTag.created_on = value.length > 0 ? value[0].created_on : null
      }
      if (queueTag.type_id === 4) {
        const value = await db.common.get(integerTable, { id: queueTag.value_id})
        queueTag.value = value.length > 0 ? value[0].value : null
        queueTag.created_on = value.length > 0 ? value[0].created_on : null
      }
      delete queueTag.value_id
    }

    return queueTags

  } catch (error) {
    throw new Error (error)
  }
}

module.exports = { getTags, getLastValue, getTagInfo, insertTagValue, getQueueTag }
