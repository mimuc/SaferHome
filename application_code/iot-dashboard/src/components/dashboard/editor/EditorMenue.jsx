import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import SlotField from './SlotField';

import { SlotType } from '../../../models';

const Menue = ({ selected, onClick }) => (
  <ButtonGroup toggle>
    {Object.keys(SlotType).map((slotType) => (
      <ToggleButton
        key={slotType}
        type="radio"
        variant="primary"
        name="radio"
        value={slotType}
        checked={selected === slotType}
        onChange={(e) => onClick(e.currentTarget.value)}
      >
        <SlotField slotType={slotType} />
      </ToggleButton>
    ))}
  </ButtonGroup>
);

Menue.propTypes = {
  selected: PropTypes.oneOf(Object.keys(SlotType)),
  onClick: PropTypes.func,
};

export default Menue;
