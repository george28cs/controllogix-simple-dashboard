
const mqtt = require('mqtt')
const websocket = require('websocket-stream')
const { getQueueTags, markTagAsSent } = require('./services/plcServices/tagStorage')

const { token, user, mqttServerPort, mqttServerUrl } = require('./config')
const host = `ws://${mqttServerUrl}:${mqttServerPort}` 
let connectionError;

const options = {
  clientId: 'PLC01',
  protocol: 'ws',
  username: user,
  password: [token].join('.'),
  clean: false
}

const client = new mqtt.Client( () => websocket(host), options)

//MQTT events
client.on('connect', async () => {
  console.info('Connected to MQTT Server')
  client.subscribe('aedes/serverResponse');
  const queuedTags = await getQueueTags()
  for (let queueTag of queuedTags) {
    client.publish('queuedTag', JSON.stringify(queueTag))
    await sleep(1000)
  }
})

client.on('message', async (topic, message) => {
  
  try {
    if (topic === 'aedes/serverResponse'){
      message = JSON.parse(message.toString())
      console.log(message, 'Successful')
      await markTagAsSent(message.request_id)
    }
  } catch (error) {
    console.error(error)
  }
});

client.on('error', (error) => {
  if (error.message !== connectionError) {
    console.error(error.message)
  }
  connectionError = error.message
})

client.on('disconnect', () => console.info('disconnect'))
client.on('offline', () => {
  console.log('Disconnected from MQTT Server')
  client.unsubscribe('aedes/serverResponse')
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


module.exports = client
