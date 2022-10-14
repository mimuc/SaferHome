import React from 'react';
import PropTypes from 'prop-types';

const TrafficLight = ({ level }) => (
  <div>
    {level === 1 ? (
      <div className="Lamp" style={{ backgroundColor: 'red' }} />
    ) : (
      <div className="Lamp" />
    )}
    {level === 2 ? (
      <div className="Lamp" style={{ backgroundColor: 'yellow' }} />
    ) : (
      <div className="Lamp" />
    )}
    {level === 3 ? (
      <div className="Lamp" style={{ backgroundColor: 'green' }} />
    ) : (
      <div className="Lamp" />
    )}
  </div>
);

TrafficLight.propTypes = {
  level: PropTypes.number,
};

export default TrafficLight;
