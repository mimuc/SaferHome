import React from 'react';
import PropTypes from 'prop-types';

import Image from 'react-bootstrap/Image';

import { SlotType } from '../../../models';

// TODO: change img size depending on screen width
const SlotField = ({ slotType }) => {
  const imgWidth = 30;
  const imgHeight = 30;

  // <Image src="/img/parquet.png" width={imgWidth} height={imgHeight} rounded />
  return (
    <>
      {slotType === SlotType.FLOOR && (
        <div style={{ height: 30, width: 30, backgroundColor: 'white' }} />
      )}
      {slotType === SlotType.WALL && (
        <Image src="/img/wall.png" width={imgWidth} height={imgHeight} rounded />
      )}
      {slotType === SlotType.DOOR && (
        <Image src="/img/door.png" width={imgWidth} height={imgHeight} rounded />
      )}
      {slotType === SlotType.IOTSENSOR && (
        <Image src="/img/sensor.png" width={imgWidth} height={imgHeight} rounded />
      )}
    </>
  );
};

SlotField.propTypes = {
  slotType: PropTypes.oneOf(Object.keys(SlotType)),
};

export default SlotField;
