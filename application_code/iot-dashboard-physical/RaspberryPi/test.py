from IoT_Sensor import Sensor
from AWS import DynamoDB_Controller

DASHBOARDID = '47a97d9d-63bb-4aeb-b430-39c860e32c4c'
HOUSEHOLDID = 'household_steffitobi'

dynamodb = DynamoDB_Controller(
    awsProfil='iot-dashboard-pi', 
    devicesTableName='Device-vjtl7ktdrrftjm5acvjemnzuoy-master', 
    dashboardsTableName='Dashboard-vjtl7ktdrrftjm5acvjemnzuoy-master'
    )

sensors = [
    Sensor(3,'34353d38-b241-4662-8b39-7baccbfc8155'),
    Sensor(4,'71e9a035-dc60-4c2a-80fb-7b1426db9ffb'),
]

sensors[0].setDashboardPosition(1,1)
sensors[1].setDashboardPosition(31,32)
print(sensors[1].index)
dynamodb.saveNewSensorPosition(sensors, DASHBOARDID)