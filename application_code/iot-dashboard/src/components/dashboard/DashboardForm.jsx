import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import SuccessAlert from '../SuccessAlert';

import { createDashboard } from './DashboardServices';

const DashboardForm = ({ onCancel }) => {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    dashboardRow: 2,
    dashboardCol: 2,
    boardRow: 8,
    boardCol: 8,
  });

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onCancel();
    }, 1500);
  };

  const handleSubmit = (event) => {
    if (event.currentTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.currentTarget.checkValidity() === true) {
      event.preventDefault();
      createDashboard(form)
        .then(() => {
          handleSuccess();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error saving dashboard', error);
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
      <Jumbotron>
        <h4>Dashboard:</h4>
        <p>
          A dashboard consists of one or more boards. The boards can be placed next to each other in
          a row (e.g. 4x1 matrix) or next to and below each other (e.g. 2x2 matrix).
        </p>
        <h4>Board:</h4>
        <p>
          There are many slots on a board, arranged in height and width (e.g. 8x8 matrix). A slot
          can have the status sensor, wall or floor.
        </p>
      </Jumbotron>

      {success && <SuccessAlert title="Success" message="Dashboard saved successfully!" />}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3>Dashboard</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formBasicName">
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
            />
            <Form.Control.Feedback type="invalid">
              Enter a name for your dashboard.
            </Form.Control.Feedback>
          </Form.Group>
          <Col />
        </Form.Row>
        <DashboardConfiguration />
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

DashboardForm.propTypes = {
  onCancel: PropTypes.func,
};

export default DashboardForm;
