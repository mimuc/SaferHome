/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { render } from '@testing-library/react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import EditorView from './EditorView';
import InformationModal from '../../InformationModal';

import { Dashboard, Slot, SlotType, Device } from '../../../models';
import { searchDashboardById, updateDashboard } from '../DashboardServices';
import { fetchDevices, fetchDevicesById } from '../../device/DeviceServices';

const Editor = () => {
  const { id } = useParams();
  const [editorMode, setEditorMode] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState();
  const [radioSlotType, setRadioSlotType] = useState(SlotType.WALL);
  const [devices, setDevices] = useState(undefined);
  const [selectedDeviceId, setSelectedDeviceId] = useState(undefined);

  useEffect(() => {
    fetchDevices().then((res) => {
      setDevices(res);
    });

    const subscriptionDevices = DataStore.observe(Device).subscribe(() => {
      fetchDevices().then((res) => {
        setDevices(res);
      });
    });

    searchDashboardById(id).then((res) => {
      setForm(res[0]);
    });

    const subscriptionDashboard = DataStore.observe(Dashboard).subscribe(() => {
      searchDashboardById(id).then((res) => {
        setForm(res[0]);
      });
    });

    return () => {
      subscriptionDevices.unsubscribe();
      subscriptionDashboard.unsubscribe();
    };
  }, []);

  const handleEditModeButton = () => {
    setEditorMode(true);
  };

  const handleRadioSlotTypeUpdate = (event) => {
    setRadioSlotType(event.target.value);
    setSelectedDeviceId(undefined);
  };

  const handleSlotUpdate = (index) => {
    const items = [...form.data];
    if (radioSlotType === SlotType.IOTSENSOR && selectedDeviceId === undefined) {
      setValidated(true);
    } else {
      setValidated(false);
      const item = new Slot({
        slotType: radioSlotType,
        deviceId: selectedDeviceId || null,
      });
      items[index] = item;
    }

    setForm({
      ...form,
      data: items,
    });
  };

  const clickedOnSlot = async (index) => {
    if (editorMode) {
      handleSlotUpdate(index);
    } else if (form.data[index].slotType === SlotType.IOTSENSOR) {
      const d = await fetchDevicesById(form.data[index].deviceId);
      render(<InformationModal device={d[0]} />);
    }
  };

  const handleSubmit = (event) => {
    if (event.currentTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.currentTarget.checkValidity() === true) {
      event.preventDefault();
      updateDashboard(form)
        .then(() => {
          setEditorMode(false);
          setRadioSlotType(SlotType.WALL);
          setSelectedDeviceId(undefined);
          setValidated(false);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error saving slot', error);
        });
    }

    setValidated(true);
  };

  // eslint-disable-next-line no-unused-vars
  const DashboardConfiguration = () => (
    <>
      <Form.Row>
        <Form.Group as={Col} controlId="formBasicRow">
          <Form.Label>
            Rows <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            type="number"
            value={form.dashboardRow}
            name="dashboardRow"
            onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })}
            placeholder="Enter a number between 1 and 10."
            min={1}
            max={10}
            required
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            Enter a number between 1 and 10.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">Number of boards side by side.</Form.Text>
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicColumn">
          <Form.Label>
            Columns <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            type="number"
            value={form.dashboardCol}
            name="dashboardColumn"
            onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })}
            placeholder="Enter a number between 1 and 10."
            min={1}
            max={10}
            required
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            Enter a number between 1 and 10.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">Number of boards in one column.</Form.Text>
        </Form.Group>
      </Form.Row>
      <h3>Board</h3>
      <Form.Row>
        <Form.Group as={Col} controlId="formBasicHeight">
          <Form.Label>
            Height <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            type="number"
            value={form.boardRow}
            name="boardRow"
            onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })}
            placeholder="Enter a number between 1 and 10."
            min={1}
            max={10}
            required
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            Enter a number between 1 and 10.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">Number of slots vertical on the board.</Form.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formBasicWidth">
          <Form.Label>
            Width <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            type="number"
            value={form.boardCol}
            name="boardCol"
            onChange={(e) => setForm({ ...form, [e.target.name]: Number(e.target.value) })}
            placeholder="Enter a number between 1 and 10."
            min={1}
            max={10}
            required
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            Enter a number between 1 and 10.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">Number of slots horizontal on the board.</Form.Text>
        </Form.Group>
      </Form.Row>
    </>
  );

  return (
    <>
      {form && (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <h3>Dashboard</h3>
            </Col>
            <Col>
              {!editorMode && (
                <Button
                  variant="primary"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={handleEditModeButton}
                >
                  Edit
                </Button>
              )}
            </Col>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formFieldName">
              <Form.Label>
                Name <div style={{ color: 'red', display: 'inline' }}>*</div>
              </Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                name="name"
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder="Enter Name"
                required
                readOnly={!editorMode}
              />
              <Form.Control.Feedback type="invalid">
                Enter a name for your device.
              </Form.Control.Feedback>
            </Form.Group>
            <Col />
          </Form.Row>
          {editorMode && (
            <Form.Row style={{ marginTop: 30 }}>
              <Form.Group as={Col} controlId="formFieldSlotType">
                <Form.Label>
                  Slot Type <div style={{ color: 'red', display: 'inline' }}>*</div>
                </Form.Label>
                <Form.Control
                  as="select"
                  type="name"
                  value={radioSlotType}
                  name="slotType"
                  onChange={handleRadioSlotTypeUpdate}
                >
                  {Object.keys(SlotType).map((key, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <option key={i} value={key}>
                      {key}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">Select a slot type.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formFieldCategory">
                {radioSlotType === SlotType.IOTSENSOR && (
                  <>
                    <Form.Label>
                      Category Type <div style={{ color: 'red', display: 'inline' }}>*</div>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      type="name"
                      defaultValue=""
                      name="category"
                      onChange={(e) => setSelectedDeviceId(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        --- select a category ---
                      </option>
                      {devices.map((device) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={device.id} value={device.id}>
                          {device.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Select a category for your sensor.
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
            </Form.Row>
          )}

          <Form.Row
            style={{
              marginTop: 45,
              marginBottom: 45,
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'lightgray',
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            <Col>
              <EditorView dashboard={form} devices={devices} clickedOnSlot={clickedOnSlot} />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              {editorMode ? (
                <Button variant="primary" type="submit" style={{ float: 'right' }}>
                  Submit
                </Button>
              ) : (
                <Button variant="secondary" type="button" style={{ float: 'right' }}>
                  Submit
                </Button>
              )}

              <Button
                variant="outline-secondary"
                href="/dashboard"
                style={{ float: 'right', marginRight: '10px' }}
              >
                Close
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}
    </>
  );
};

export default Editor;
