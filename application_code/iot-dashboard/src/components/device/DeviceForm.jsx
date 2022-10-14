import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import SuccessAlert from '../SuccessAlert';

import { CategoryType, Device, Rating } from '../../models';
import { createDevice, updateDevice } from './DeviceServices';

const DeviceForm = ({ onCancel, device }) => {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState({
    technologyResponsibility: '',
    ECD3: '',
    ECD4: '',
    ECD5: '',
  });
  const [form, setForm] = useState({
    name: '',
    information: '',
    category: '',
    technologyResponsibility: [],
    ECD3: [],
    ECD4: [],
    ECD5: [],
  });

  const findValues = async (obj) => {
    const res = {
      technologyResponsibility: '',
      ECD3: '',
      ECD4: '',
      ECD5: '',
    };
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const technologyResponsibility = obj.technologyResponsibility.find(
      (element) => element.userId === cognitoUser.username,
    );
    if (technologyResponsibility) {
      res.technologyResponsibility = technologyResponsibility.scale;
    }
    const ECD3 = obj.ECD3.find((element) => element.userId === cognitoUser.username);
    if (ECD3) {
      res.ECD3 = ECD3.scale;
    }
    const ECD4 = obj.ECD4.find((element) => element.userId === cognitoUser.username);
    if (ECD4) {
      res.ECD4 = ECD4.scale;
    }
    const ECD5 = obj.ECD5.find((element) => element.userId === cognitoUser.username);
    if (ECD5) {
      res.ECD5 = ECD5.scale;
    }
    return res;
  };

  const resetForm = () => {
    setForm({
      name: '',
      information: '',
      category: CategoryType.OTHER,
      technologyResponsibility: [],
      ECD3: [],
      ECD4: [],
      ECD5: [],
    });
  };

  // If a device object is handed over to the form, this function updates the form fields.
  useEffect(() => {
    if (device) {
      setForm(device);
      const fetchScale = async () => {
        const found = await findValues(device);
        if (found) {
          setValue(found);
        }
      };
      fetchScale();
    }
    return () => resetForm();
  }, []);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onCancel();
    }, 1500);
  };

  const updateValue = async (e) => {
    setValue({ ...value, [e.target.name]: Number(e.target.value) });
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const filter = (element) => element.userId === cognitoUser.username;
    const index = form[e.target.name].findIndex(filter);

    if (index === -1) {
      const obj = new Rating({
        userId: cognitoUser.username,
        scale: Number(e.target.value),
      });
      const items = [...form[e.target.name]];
      items.push(obj);
      setForm({
        ...form,
        [e.target.name]: items,
      });
    } else {
      const items = [...form[e.target.name]];
      const item = { ...items[index] };
      item.scale = Number(e.target.value);
      items[index] = item;

      setForm({
        ...form,
        [e.target.name]: items,
      });
    }
  };

  const handleSubmit = (event) => {
    if (event.currentTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.currentTarget.checkValidity() === true) {
      event.preventDefault();
      if (device) {
        updateDevice(form)
          .then(() => {
            handleSuccess();
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('Error saving device', error);
          });
      } else {
        createDevice(form)
          .then(() => {
            handleSuccess();
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('Error saving device', error);
          });
      }
    }

    setValidated(true);
  };

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {success && <SuccessAlert title="Success" message="Device saved successfully!" />}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3>Device</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formFieldName">
            <Form.Label>
              Name <div style={{ color: 'red', display: 'inline' }}>*</div>
            </Form.Label>
            <Form.Control
              type="text"
              value={form.name}
              name="name"
              onChange={updateField}
              placeholder="Enter Name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Enter a name for your device.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formFieldInformation">
            <Form.Label>Information</Form.Label>
            <Form.Control
              type="text"
              value={form.information}
              name="information"
              onChange={updateField}
              placeholder="Enter Description"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formFieldTechnologyResponsibility">
            <Form.Label>
              Technology Responsibility <div style={{ color: 'red', display: 'inline' }}>*</div>
            </Form.Label>
            <Form.Control
              type="number"
              value={value.technologyResponsibility}
              name="technologyResponsibility"
              onChange={updateValue}
              placeholder="Rate your technology responsibility."
              min={1}
              max={7}
              required
            />
            <Form.Control.Feedback type="invalid">
              Enter a number between 1 and 7.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              There are two types of users in a household. Some like to experiment with new devices
              and install new IoT devices, these are so called <strong>Pilot</strong> users. The
              others only use the devices and sometimes don&apos;t even know what possibilities are
              available, these are <strong>Passanger</strong> users. Please choose the one that
              applies to you more.
              <br /> 1 = Passanger user <br /> 4 = neutral <br />7 = Pilot user
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formFieldCategory">
            <Form.Label>
              Category <div style={{ color: 'red', display: 'inline' }}>*</div>
            </Form.Label>
            <Form.Control
              as="select"
              type="name"
              value={form.category}
              name="category"
              onChange={updateField}
              required
            >
              <option value="" disabled>
                --- select a category ---
              </option>
              {Object.keys(CategoryType).map((key, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">Select a device category.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <div
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
          <Alert variant="info">
            Please complete these questions for each of your devices at the end of the study phase.
            It does not matter if you complete them now, but you will be advised to adjust them
            again at the end of the study phase.
          </Alert>
          <p>Please rate each.</p>
          <p>1 = not true at all</p>
          <p>4 = somewhat true</p>
          <p>7 = very true</p>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                I feel that I need to carefully monitor the security evaluation of this device in
                the future.
              </Form.Label>
              <Form.Control
                type="number"
                name="ECD3"
                value={value.ECD3}
                onChange={updateValue}
                placeholder="Please rate."
                min={1}
                max={7}
              />
              <Form.Control.Feedback type="invalid">
                Enter a number between 1 and 7.
              </Form.Control.Feedback>
            </Form.Group>
            <Col />
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                I am concerned about the risk that this device poses to the security of my home
                network.
              </Form.Label>
              <Form.Control
                type="number"
                name="ECD4"
                value={value.ECD4}
                onChange={updateValue}
                placeholder="Please rate."
                min={1}
                max={7}
              />
              <Form.Control.Feedback type="invalid">
                Enter a number between 1 and 7.
              </Form.Control.Feedback>
            </Form.Group>
            <Col />
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                I am willing to disconnect this device from my home network in order to reduce the
                overall risk for my home’s computer security.
              </Form.Label>
              <Form.Control
                type="number"
                name="ECD5"
                value={value.ECD5}
                onChange={updateValue}
                placeholder="Please rate."
                min={1}
                max={7}
              />
              <Form.Control.Feedback type="invalid">
                Enter a number between 1 and 7.
              </Form.Control.Feedback>
            </Form.Group>
            <Col />
          </Form.Row>
        </div>
        <Form.Row>
          <Col>
            <Button variant="primary" type="submit" style={{ float: 'right' }}>
              Submit
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onCancel}
              style={{ float: 'right', marginRight: '10px' }}
            >
              Cancel
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
};

DeviceForm.propTypes = {
  device: PropTypes.oneOfType([PropTypes.instanceOf(Device), PropTypes.instanceOf(null)]),
  onCancel: PropTypes.func,
};

export default DeviceForm;
