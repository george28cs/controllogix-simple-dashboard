const knex = require('./knex')

const get = async (table, data) => {
  try {
    return knex(table)
      .where(data)
      .where('is_deleted', false);
  } catch (error) {
    console.error(error)
  }
}

const getAll = async (table) => {
  try {
    return knex(table)
      .select('*')
      .where('is_deleted', false);
  } catch (error) {
    console.error(error)
  }
}

const insert = async (table, data) => {
  try {
    return knex(table)
      .insert(data)
  } catch (error) {
    console.error(error)
  }
}

const update = async (table, data, constrains) => {
  try {
    return knex(table)
      .update(data)
      .where(constrains);
  } catch (error) {
    console.error(error)
  }
}

const remove = async (table, constrains) => {
  try {
    const data = {
      is_deleted: true
    }
    return knex(table)
      .update(data)
      .where(constrains)
  } catch (error) {
    console.error(error)
  }
}

module.exports = { get, insert, update, remove, getAll }