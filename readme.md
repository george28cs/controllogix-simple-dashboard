# Simple Logix Data Storage Tool

## Description

A small and very useful tool for Real Time monitoring Allen-Bradley PLC tag values and writing to MySQL 
via EthernetIP connection (Industrial Protocol).

LogixTool capable save your valuable time, money and keep your issues under control.

## Application

Production automation based on Allen-Bradley PLC (ControlLogix, CompactLogix, SoftLogix).


## Advanteges

No additional special programs are required (for example, the OPC server, etc.) for this utility to work.

## System Requirements

- Nodejs
 

## Installation and Running

1. Clone this repository. 
2. Run ``` npm install```.  
3. Create ``` plc_db``` database into mysql.  
3. Add .env (environment variables) to the root (you can copy and rename the .env.example).
4. Setup .env: 
```
TOKEN=some_secret_token(optional)
USER_NAME=some_mqtt_user(optional)
MQTT_SERVER_URL= optional_mqtt_server
MQTT_SERVER_PORT= optional_mqtt_port
DB_HOST= mysql_host
DB_USER= mysql_user
DB_PASSWORD= mysql_password
DB_NAME= plc_db 
DB_PORT= mysql_port
#This is your dashboard port
LOCAL_SERVER_PORT= your_dashboard_port
PLC_IP= plc_ip_address

```
5. Run ```npm run start```

