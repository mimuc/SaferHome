import React from 'react';
import PropTypes from 'prop-types';

import BoardRow from './BoardRow';

const EditorView = ({ dashboard, devices, clickedOnSlot }) => {
  const searchDevice = (id) => devices.find((element) => element.id === id);

  const placeDevicesOnDashboard = (data) => {
    const res = [];
    for (let j = 0; j < data.length; j++) {
      const slot = data[j];
      if (slot.deviceId) {
        res[j] = searchDevice(slot.deviceId);
      } else {
        res[j] = slot;
      }
    }
    return res;
  };

  const createBoard = (data) => {
    const b = [];
    const width = dashboard.dashboardRow * dashboard.boardRow;
    const height = dashboard.dashboardCol * dashboard.boardCol;
    const totalSum = width * height;
    let currHeight = 0;

    for (let i = 0; i < totalSum; i += width) {
      const dashboardRow = data.slice(i, i + width);
      b.push(
        <BoardRow
          key={i}
          row={dashboardRow}
          currHeight={currHeight}
          width={width}
          clickedOnSlot={clickedOnSlot}
        />,
      );
      currHeight += 1;
    }
    return b;
  };
  const data = placeDevicesOnDashboard(dashboard.data);
  const dboard = createBoard(data);

  return <>{dboard}</>;
};

EditorView.propTypes = {
  dashboard: PropTypes.instanceOf(Object),
  devices: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  clickedOnSlot: PropTypes.func,
};

export default EditorView;
