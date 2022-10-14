import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'html-react-parser';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InformationModal = ({ device }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Device: {device.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Level Description: 1 = bad, 2 = moderate, 3 = good</p>
        {device.privacyLevel ? (
          <p>
            <strong>Privacy Level:</strong> {device.privacyLevel}
          </p>
        ) : (
          <p>
            <strong>Privacy Level:</strong> analysing...
          </p>
        )}
        {device.securityLevel ? (
          <p>
            <strong>Security Level:</strong> {device.securityLevel}
          </p>
        ) : (
          <p>
            <strong>Security Level:</strong> analysing...
          </p>
        )}
        {device.information && (
          <p>
            <strong>Model/ Firmeware:</strong> {device.information}
          </p>
        )}
        {device.message ? (
          <p>
            <strong>Message:</strong> {ReactHtmlParser(device.message)}
          </p>
        ) : (
          <p>
            <strong>Message:</strong> analysing...
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

InformationModal.propTypes = {
  device: PropTypes.instanceOf(Object),
};

export default InformationModal;
