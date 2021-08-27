const mysql = require('mysql')
const fs = require('fs')
require('dotenv').config()
const config = require('../../config')

const dbconf = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
  multipleStatements: true
}

let connection
handleCon()

function handleCon () {
  connection = mysql.createConnection(dbconf)

  connection.connect(async (err) => {
    if (err) {
      console.error('[db err]', err)
      setTimeout(handleCon, 2000)
    } else {
      await createDatabase()
      connection.end()
    }
  })

  connection.on('error', (err) => {
    console.error('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw err
    }
  })
}

const tablesCreationPath = __dirname + '/1._dataTablesCreates.sql'
const dataInsertionPath = __dirname + '/2._dataInsertion.sql'

const mysqlQuery = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error)
      } else {
        const stringQuery = data.toString()
        resolve(stringQuery)
      }
    })
  })
}

const createDatabase = async () => {
  try {
    const query = await mysqlQuery(tablesCreationPath)
    const dataInsertionQuery = await mysqlQuery(dataInsertionPath)
    await execQuery(query)
    await execQuery(dataInsertionQuery)
    console.log('Tables created')
  } catch (error) {
    console.error(error)
  }
}

function execQuery (file) {
  return new Promise((resolve, reject) => {
    connection.query(file, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
