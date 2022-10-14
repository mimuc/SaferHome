from typing import List, Tuple, Type

class Dashboard:

    def __init__(self, tile=2, row=8, column=8, threshold=0.2, operatingVoltage=5.12):
        """Configuration of a IoT-dashboard.


        Args:
            tile (int, optional): Total number of boards connected with each other to build one dashboard. Defaults to 2.
            row (int, optional): Number of rows on one board. Defaults to 8.
            column (int, optional): Number of columns on one board. Defaults to 8.
            threshold (float, optional): Maximum deviation of the measured values from the pins on the microcontroller. Defaults to 0.2.
            OPERATING_VOLTAG (float, optional): Operating VOltage of the dashboard.
        """
        self.tile = tile
        self._row = row
        self._column = column
        self._threshold = threshold
        self._OPERATING_VOLTAGE = operatingVoltage
        self._tileVoltageSteps = self._calculateVoltageStepsTile(self.tile)
        self._rowVoltageSteps = self._calculateVoltageStepsRowCol(self._row - 1)
        self._colVoltageSteps = self._calculateVoltageStepsRowCol(self._column - 1)
        
    
    def _calculateVoltageStepsRowCol(self, numOfSteps: int) -> List[Type[float]]:
        RESISTOR = self._OPERATING_VOLTAGE/numOfSteps
        res: List[Type[float]] = []
        for step in range(numOfSteps + 1):
            res.append(round(self._OPERATING_VOLTAGE - (step * RESISTOR), 2))
        return res

    def _calculateVoltageStepsTile(self, numOfSteps: int) -> List[Type[float]]:
        RESISTOR = self._OPERATING_VOLTAGE/numOfSteps
        res: List[Type[float]] = []
        for step in range(numOfSteps):
            res.append(round(self._OPERATING_VOLTAGE - (step * RESISTOR), 2))
        return res

    def relativePosition(self, tileVoltage: float, rowVoltage: float, columnVoltage: float) -> Tuple[int, int, int]:
        """Calculate the position of the microcontroller on one board. 

        Args:
            tileVoltage (float): Voltage value of the Pin for the tile on the microcontroller.
            rowVoltage (float): Voltage value of the Pin for the row on the microcontroller.
            columnVoltage (float): Voltage value of the Pin for the column on the microcontroller.

        Returns:
            Tuple[int, int, int]: Position (tile, row, column) of the microcontroller on the board.
        """
        tile = self._abc(tileVoltage, self._tileVoltageSteps)
        row = self._abc(rowVoltage, self._rowVoltageSteps)
        col = self._abc(columnVoltage, self._colVoltageSteps)
        
        return (tile, row, col)

    def totalPosition(self, tileVoltage: float, rowVoltage: float, columnVoltage: float) -> Tuple[int, int]:
        """Calculate the position of the microcontroller on the hole IoT-Dashboard.
        (1,1) is in the top left corner.

        IoT-Dashboard tile order:
        [[1, 2, 3, 4],
        [ 8, 7, 6, 5],
        [ 9,10,11,12],
        [16,15,14,13]]

        Args:
            tileVoltage (float): Voltage value of the Pin for the tile on the microcontroller.
            rowVoltage (float): Voltage value of the Pin for the row on the microcontroller.
            columnVoltage (float): Voltage value of the Pin for the column on the microcontroller.

        Returns:
            Tuple[int, int]: (Row, Column) sTotal position of the microcontroller on the IoT-Dashboard. (e.g. (20, 23))
        """
        t, r, c = self.relativePosition(tileVoltage, rowVoltage, columnVoltage)
        row = r + (self._row * self._rowMultiplicator(t))
        col = c + (self._column * self._colMultiplicator(t))
        return (row, col)

    def _colMultiplicator(self, tile: int) -> int:
        """Returns the multiplicator for the column.
        
        IoT-Dashboard tile order:
        [[1, 2, 3, 4],
        [ 8, 7, 6, 5],
        [ 9,10,11,12],
        [16,15,14,13]]

        Args:
            tile (int): Number of the tile.

        Returns:
            int: Multiplicator for the column. If it can't match with a value it returns -1.
        """
        switcher = {
            1: 0,
            8: 0,
            9: 0,
            16: 0,
            2: 1,
            7: 1,
            10: 1,
            15: 1,
            3: 2,
            6: 2,
            11: 2,
            14: 2,
            4: 3,
            5: 3,
            12: 3,
            13: 3
        }
        return switcher.get(tile, -1)

    def _rowMultiplicator(self, tile: int) -> int:
        """Returns the multiplicator for the row.
        
        IoT-Dashboard tile order:
        [[1, 2, 3, 4],
        [ 8, 7, 6, 5],
        [ 9,10,11,12],
        [16,15,14,13]]

        Args:
            tile (int): Number of the tile.

        Returns:
            int: Multiplicator for the row. If it can't match with a value it returns -1.
        """
        switcher = {
            1: 0,
            8: 1,
            9: 2,
            16: 3,
            2: 0,
            7: 1,
            10: 2,
            15: 3,
            3: 0,
            6: 1,
            11: 2,
            14: 3,
            4: 0,
            5: 1,
            12: 2,
            13: 3
        }
        return switcher.get(tile, -1)

 
    def _abc(self, voltage:float, voltageSteps: List[Type[float]]) -> int:
        """
        Args:
            voltage (float): Voltage value from a Pin.
            voltageSteps (List[Type[float]]): VoltageSteps from row or column.

        Returns:
            int: Number of the Tile, Row or Column. If it can't match with a value it returns -1.
        """
        for i, step in enumerate(voltageSteps):
            if voltage >= (step - self._threshold) and voltage <= (step + self._threshold):
                return i + 1
        return -1

    def printVoltageSteps(self):
        print("### Voltage Steps ###")
        print(f"Tile: {self._tileVoltageSteps}")
        print(f"Row: {self._rowVoltageSteps}")
        print(f"Col: {self._colVoltageSteps}")