module.exports = {
  token: process.env.TOKEN,
  user: process.env.USER_NAME,
  mqttServerUrl: process.env.MQTT_SERVER_URL,
  mqttServerPort: process.env.MQTT_SERVER_PORT,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  port: process.env.LOCAL_SERVER_PORT,
  plcIp: process.env.PLC_IP
}