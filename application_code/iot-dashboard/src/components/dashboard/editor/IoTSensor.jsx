import React from 'react';
import PropTypes from 'prop-types';

import Image from 'react-bootstrap/Image';

import { CategoryType } from '../../../models';

const IoTSensor = ({ category }) => {
  const imgWidth = 30;
  const imgHeight = 30;

  return (
    <>
      {category === CategoryType.OTHER && (
        <Image src="/img/sensor.png" width={imgWidth} height={imgHeight} rounded />
      )}
      {category === CategoryType.VOICEASSISTENT && (
        <Image src="/img/voice_assistent.png" width={imgWidth} height={imgHeight} rounded />
      )}
      {category === CategoryType.LIGHTSENSOR && (
        <Image src="/img/light.png" width={imgWidth} height={imgHeight} rounded />
      )}
      {category === CategoryType.TEMPERATURESENSOR && (
        <Image src="/img/temperaturesensor.png" width={imgWidth} height={imgHeight} rounded />
      )}
    </>
  );
};

IoTSensor.propTypes = {
  category: PropTypes.oneOf(Object.keys(CategoryType)),
};

export default IoTSensor;
