const db = require('../../../services/database')

const validateTagCreation = async (data, helper) => {
  try {
    console.log('Data', data)
    const validTag = await db.joi.validateTagCreation(data)
    if (validTag.length > 0) {
      return helper.message('already exist')
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { validateTagCreation }