from typing import List, Tuple
import boto3
from boto3.dynamodb.conditions import Attr, Key
from IoT_Sensor import Sensor

class DynamoDB_Controller:
    def __init__(self, awsProfil: str, devicesTableName: str, dashboardsTableName: str) -> None:
        self.session = boto3.session.Session(profile_name=awsProfil)
        self.dynamodb = self.session.resource('dynamodb')
        self.devices = self.dynamodb.Table(devicesTableName)
        self.dashboards = self.dynamodb.Table(dashboardsTableName)

    def getDeviceListByHousehold(self, householdName: str) -> List[any]:
        """Returns the list of devices this household has created in the IoT-Dashboard device list.

        Args:
            householdName (str): The name of the groupe created on the AWS Amplify backend.

        Returns:
            List[any]: List of all devices.
        """
        try:
            response = self.devices.scan(
                FilterExpression=Attr('householdId').eq(householdName)
            )
            return response['Items']
        except Exception as e:
            print('Item not found')
            return None


    def getDevice(self, id: str) -> object:
        try:
            response = self.devices.get_item(
                Key={'id': id}
            )
            return response
        except Exception as e:
            print('Device not found')
            return None


    def getDashboardListByHousehold(self, householdName: str) -> List[any]:
        try:
            response = self.dashboards.scan(
                FilterExpression=Attr('householdId').eq(householdName)
            )
            return response['Items']
        except Exception as e:
            print('Item not found')
            return None


    def getDashboard(self, id: str) -> object:
        """Get the dashboard with spefic ID.

        Args:
            id (str): Dashboard ID

        Returns:
            [type]: Dashboard
        """
        try:
            response = self.dashboards.get_item(
                Key={'id': id}
            )
            return response
        except Exception as e:
            print('Dashboard not found', e)
            return None

    def saveNewSensorPosition(self, sensors: List[Sensor], dashboardId: str):
        oldData = self.getDashboard(dashboardId)['Item']['data']

        for i, sensor in enumerate(sensors):
            # delete sensor
            for j, slot in enumerate(oldData):
                try:
                    if (slot['deviceId'] == sensor.aws_id):
                        print(f'Found Sensor on index {j}')
                        oldData[j] = {
                            'slotType': 'FLOOR',
                            'deviceId': None
                        }
                except:
                    pass
            
            # add new sensor position
            oldData[sensor.index] = {
                        'slotType': 'IOTSENSOR',
                        'deviceId': sensor.aws_id
                    }
        
        self.updateDashboardData(oldData, dashboardId)

    def updateDashboardData(self, newData: List, dashboardId: str):
        try:
            response = self.dashboards.update_item(
                Key={
                    'id': dashboardId
                },
                UpdateExpression='SET #slots = :updated',
                ExpressionAttributeValues={
                    ':updated': newData
                },
                ExpressionAttributeNames={
                    '#slots':'data'
                }
            )
            return response
        except Exception as e:
            print('Dashboard could not be updated:', e)
            return None 


def indexToTuple(index: int, rowLength: int) -> Tuple[int]:
    """This function takes a tuple of x and y coordinates and returns an index.
    [[1,2]
    [3,4]     ---> [1,2,3,4,5,6]
    [5,6]]

    Args:
        tuple (List[int]): (X, Y) coordinates

    Returns:
        int: Index starting at 0.

    >>> indexToTuple(27,8)
    (4, 4)
    >>> indexToTuple(9,8)
    (2, 2)
    >>> indexToTuple(63,8)
    (8, 8)
    """
    num = index + 1
    col = num % rowLength
    if col == 0:
        col = rowLength
    row = ((num - col) / rowLength) + 1
    return int(row), col