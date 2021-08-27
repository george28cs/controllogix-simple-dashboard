const db = require('../database')
const tagTable = 'tag'


const getDataTypes = async () => {
  try {
    return {
      data_types:  await db.common.getAll('tag_type'),
    }
  } catch (error) {
    throw new Error (error)
  }
}

const createTag = async (data) => {
  try {
    const { name, scope } = data
    const existingTag = await db.common.get(tagTable, { name, scope })
    if (existingTag.length > 0) {
      throw new Error('Existing tag')
    }
    return db.common.insert(tagTable, data)
  } catch (error) {
    throw new Error (error)
  }
}

const getTags = async () => {
  try {
    return await db.tags.getTags()
  } catch (error) {
    throw new Error (error)
  }
}

const getLastValue = async () => {
  try {
    return await db.tags.getLastValue()
  } catch (error) {
    throw new Error (error)
  }
}

deleteTag = async (id) => {
  try {
    return await db.common.remove(tagTable, { id : id})
  } catch (error) {
    throw new Error (error)
  }
}

module.exports = {
  getDataTypes,
  createTag,
  getTags, 
  getLastValue,
  deleteTag
}
