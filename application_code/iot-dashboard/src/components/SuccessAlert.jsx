import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

const SuccessAlert = ({ title, message }) => (
  <>
    <Alert variant="success">
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  </>
);

SuccessAlert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default SuccessAlert;
