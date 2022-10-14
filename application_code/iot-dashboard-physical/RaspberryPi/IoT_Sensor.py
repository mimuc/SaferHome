

class Sensor:
    def __init__(self, device_addr: int, aws_id: str) -> None:
        self.device_addr = device_addr
        self.aws_id = aws_id
        self.category = None
        self._ledStatus = 0
        self.row = 0
        self.col = 0
        self.index = None

    def setLedStatus(self, privacyLvl: int, securityLvl: int) -> None:
        self._ledStatus = min(privacyLvl, securityLvl)

    def getLedStatus(self) -> int:
        return self._ledStatus

    def setDashboardPosition(self, row: int, col: int) -> None:
        self.row = row
        self.col = col
        self.index = self._tupleToIndex(row, col, 32)
        # print('Index: ', self.index)

    def _tupleToIndex(self, row: int, col: int, rowLength: int) -> int:
        """This function takes a tuple of x and y coordinates and returns an index.
        [[1,2]
        [3,4]     ---> [1,2,3,4,5,6]
        [5,6]]

        Args:
            tuple (List[int]): (X, Y) coordinates

        Returns:
            int: Index starting at 0.

        >>> tupleToIndex(4,4,8)
        27
        >>> tupleToIndex(2,2,8)
        9
        >>> tupleToIndex(8,8,8)
        63
        """
        row_tmp = (0.5 * row) + 0.5
        col_tmp = col/2
        res = ((row_tmp - 1) * (rowLength/2)) + (col_tmp - 1)
        return int(res)