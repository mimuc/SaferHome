import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { render } from '@testing-library/react';
import { Device } from '../../models';
import DeletePopup from '../DeletePopup';
import TrafficLight from './TrafficLight';
import InformationModal from '../InformationModal';

const currentlyCalculating = 'analysing...';

const DeviceListItem = ({ device, onDelete, onEdit }) => {
  const handleDeletePopup = () => {
    render(<DeletePopup id={device.id} name={device.name} onDelete={onDelete} />);
  };

  const handleInformationModal = () => {
    render(<InformationModal device={device} />);
  };

  return (
    <>
      <tr>
        <td>{device.name}</td>
        <td>{device.information}</td>
        <td>{device.category}</td>
        <td>
          {device.securityLevel && device.privacyLevel ? (
            <TrafficLight level={Math.min(device.securityLevel, device.privacyLevel)} />
          ) : (
            <p>{currentlyCalculating}</p>
          )}
        </td>
        <td>
          {device.message && (
            <Button variant="info" onClick={handleInformationModal} style={{ margin: '0 5px' }}>
              Info
            </Button>
          )}
        </td>
        <td>
          <Button onClick={() => onEdit(device)} style={{ margin: '0 5px' }}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeletePopup} style={{ margin: '0 5px' }}>
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

DeviceListItem.propTypes = {
  device: PropTypes.instanceOf(Device),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default DeviceListItem;
