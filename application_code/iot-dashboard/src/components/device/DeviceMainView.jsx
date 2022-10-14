import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DeviceListItem from './DeviceListItem';

import { Device } from '../../models';
import DeviceForm from './DeviceForm';
import { fetchDevices, deleteDevice } from './DeviceServices';

const theads = [
  'Name',
  'Model/ Firmeware',
  'Category',
  'Privacy & Security Level',
  'Message',
  'Actions',
];

const DeviceMainView = () => {
  const [devices, setDevices] = useState([]);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(undefined);

  useEffect(() => {
    fetchDevices().then((res) => {
      setDevices(res);
    });

    const subscription = DataStore.observe(Device).subscribe(() => {
      fetchDevices().then((res) => {
        setDevices(res);
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleShowDeviceForm = () => setShowDeviceForm(true);

  const handleHideDeviceForm = () => {
    setShowDeviceForm(false);
    setSelectedDevice(undefined);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    handleShowDeviceForm();
  };

  return (
    <>
      {showDeviceForm && <DeviceForm onCancel={handleHideDeviceForm} device={selectedDevice} />}
      {!showDeviceForm && (
        <>
          <Row>
            <Col>
              <h1>Device</h1>
            </Col>
            <Col>
              <Button onClick={handleShowDeviceForm} style={{ float: 'right' }}>
                + Add new
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {theads.map((thead) => (
                      <th key={thead}>{thead}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <DeviceListItem
                      key={device.id}
                      device={device}
                      onDelete={deleteDevice}
                      onEdit={handleEditDevice}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DeviceMainView;
