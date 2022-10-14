import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import SlotField from './SlotField';
import IoTSensor from './IoTSensor';

const BoardRow = ({ row, currHeight, width, clickedOnSlot }) => (
  <Row>
    {row.map((slot, i) => {
      const index = i + currHeight * width;
      let variant = 'outline-light';
      const min = Math.min(slot.privacyLevel, slot.securityLevel);

      if (min === 1) {
        variant = 'danger';
      } else if (min === 2) {
        variant = 'warning';
      } else if (min === 3) {
        variant = 'success';
      }

      return (
        <Button variant={variant} key={index} onClick={() => clickedOnSlot(index)}>
          {slot.slotType && <SlotField slotType={slot.slotType} />}
          {slot.category && <IoTSensor category={slot.category} />}
        </Button>
      );
    })}
  </Row>
);

BoardRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.objectOf(Object)),
  currHeight: PropTypes.number,
  width: PropTypes.number,
  clickedOnSlot: PropTypes.func,
};

export default BoardRow;
