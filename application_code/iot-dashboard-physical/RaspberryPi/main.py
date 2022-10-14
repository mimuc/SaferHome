from typing import List
from Dashboard import Dashboard
from I2C_Controller import I2C_Controller
from IoT_Sensor import Sensor
from AWS import DynamoDB_Controller
import time

DASHBOARDID = '47a97d9d-63bb-4aeb-b430-39c860e32c4c'
HOUSEHOLDID = 'household_steffitobi'
TIMEINTERVALL = 60 * 60 * 1  # 1h

i2c = I2C_Controller()
dashboard = Dashboard(tile=16)
dynamodb = DynamoDB_Controller(
    awsProfil='iot-dashboard-pi', 
    devicesTableName='Device-vjtl7ktdrrftjm5acvjemnzuoy-master', 
    dashboardsTableName='Dashboard-vjtl7ktdrrftjm5acvjemnzuoy-master'
    )

sensors = [
    Sensor(3,'deac0741-0c05-401c-b9e5-27be0b7059e0'), # Tado
    Sensor(4,'dd2150c3-1396-4310-9250-c8e979e25821'), # Phillips Hue
    Sensor(5,'739773b9-b55d-4ec9-b7d9-2f67d1eef00d'), # Bose Soundbar
    Sensor(6,'69cc698a-316e-44a3-9dbf-2f98656bb1cb'), # Apple TV
    Sensor(7,'ef1a5261-ff79-49d9-8a2f-638867882e1f'), # Synology
    Sensor(8,'2b2b5a17-1e99-400e-a045-29d86f04e618'), # LaMetric
]

def updateSensorFromDashboard(sensor: Sensor) -> None:
    try: 
        data = i2c.readSensorData(sensor.device_addr)
        position = dashboard.totalPosition(*data)
        sensor.setDashboardPosition(*position)
        print(f'Sensor {sensor.device_addr} position: ({sensor.row}, {sensor.col})')
    except Exception as e:
        print(f'Sensor {sensor.device_addr} is not connected to the dahsboard:', e)
        return None 
    

def updateSensorFromDynamoDB(sensor: Sensor) -> None:
    device = dynamodb.getDevice(sensor.aws_id)['Item']
    try:
        if (device['privacyLevel'], device['securityLevel']):
            sensor.setLedStatus(device['privacyLevel'], device['securityLevel'])
        print(f'Sensor {sensor.device_addr} LED status: ', sensor.getLedStatus())
    except Exception as e:
        print(f'Cant find value for device: {sensor.aws_id}', e)
        return None

def updateAllSensors(sensors: List[Sensor]) -> None:
    for sensor in sensors:
        updateSensorFromDashboard(sensor)
        updateSensorFromDynamoDB(sensor)
        try:
            i2c.sendLedStatusToSensor(sensor.device_addr, sensor.getLedStatus())
        except:
            print(f'Sensor {sensor.device_addr}: was not able to send data to the sensor - not connected.')

    try:
        dynamodb.saveNewSensorPosition(sensors, DASHBOARDID)
    except:
        print(f'Sensor {sensor.device_addr}: was not able to send data to the database.')

while True:
    updateAllSensors(sensors)
    time.sleep(10)