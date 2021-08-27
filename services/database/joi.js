const knex = require('./knex')
const table = 'tag'
const validateTagCreation = async (data) => {
  try {
    return knex(table)
      .where(data)
      .where('is_deleted', false)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  validateTagCreation
}