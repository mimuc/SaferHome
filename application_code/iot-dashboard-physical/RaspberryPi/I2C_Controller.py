from smbus2 import SMBus
from typing import List, Tuple, Type

class I2C_Controller:

    def __init__(self, operatingVoltage=5.12, smbbus=1) -> None:
        """Controller to communicate between Raspberry Pi and sensors on the IoT-Dashboard.

        Args:
            operatingVoltage (float, optional): Voltage of the IoT-Dashboard. Defaults to 5.12.
            smbbus (int, optional): Open i2c bus on value. Defaults to 1.
        """
        self._OPERATING_VOLTAGE = operatingVoltage
        self.i2cBus = SMBus(smbbus)                     # Create a new I2C bus

    def _byteCombination(self, firstByte: bytes, secondByte: bytes) -> int:
        """Converts 2 received bytes into one integer number.

        >>> numberConverter(4,0)
        1024
        >>> numberConverter(0,0)
        0
        >>> numberConverter(3,218)
        986

        Args:
            firstByte (bytes): first byte of the integer number
            secondByte (bytes): second byte of the integer number

        Returns:
            int: Compound integer from the two input bytes.
        """
        num = firstByte
        num = (num << 8) | secondByte
        return num

    def _ADCToVoltage(self, num: int) -> float:
        """Converts the ADC value (0-1023) from the microcontroller into voltage.

        Args:
            num (int): ADC value

        Returns:
            float: Voltage (two decimal places)
        """
        resolution = round(self._OPERATING_VOLTAGE/1024, 4)
        voltage = num * resolution
        return round(voltage, 2)

    def readSensorData(self, device_addr: int) -> Tuple[float, float, float]:
        """Reades the number and the tile, row and column voltage of the sensor.

        Args:
            device_addr (bytes): Number of the sensor.

        Returns:
            Tuple[float]: tile voltage, row voltage, column voltage
        """
        arrLength = 7
        arr = [0] * arrLength  # creates an array filled with zeros
        arr = self.i2cBus.read_i2c_block_data(device_addr, 0x00, arrLength)
        # num = arr[0]
        tile = self._ADCToVoltage(self._byteCombination(arr[1], arr[2]))
        row = self._ADCToVoltage(self._byteCombination(arr[3], arr[4]))
        col = self._ADCToVoltage(self._byteCombination(arr[5], arr[6]))
        return (tile, row, col)

    def sendLedStatusToSensor(self, device_addr: int, status: int):
        """Send the status of the sensor LED.
        The value can be between 0 to 4.
        { 0: off, 1: red, 2: yelllow, 3: green }

        Args:
            device_addr (byte): Number of the sensor.
        """
        self.i2cBus.write_byte(device_addr, status)

    def printSensorVoltage(self, device_addr: bytes):
        num, tile, row, col = self.readSensorData(device_addr)
        print(f"### Sensor {num} Voltage ###")
        print(f"Tile: {tile} V")
        print(f"Row: {row} V")
        print(f"Col: {col} V")