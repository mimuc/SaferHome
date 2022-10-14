from AWS import DynamoDB_Controller

HOUSEHOLDID = 'household_steffitobi'
dynamodb = DynamoDB_Controller(
    awsProfil='iot-dashboard-pi', 
    devicesTableName='Device-vjtl7ktdrrftjm5acvjemnzuoy-master', 
    dashboardsTableName='Dashboard-vjtl7ktdrrftjm5acvjemnzuoy-master'
    )
devices = dynamodb.getDeviceListByHousehold(HOUSEHOLDID)

def printDeviceInformation() -> None:
    print(f"The household '{HOUSEHOLDID}' contains {len(devices)} devices.")
    for i, device in enumerate(devices):
        #print(f"Sensor({i+3},'{device['id']}'),")
        print(f"Name: {device['name']}, ID: {device['id']}, CategoryType: {device['category']}")

def printDashboardInformation():
    print(dynamodb.getDashboardListByHousehold(HOUSEHOLDID))

printDeviceInformation()
printDashboardInformation()