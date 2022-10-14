/* eslint-disable no-console */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { createAtiQuestionnaire } from './AtiServices';
import atiQuestions from './AtiQuestions';

const Gender = {
  Male: 'Male',
  Female: 'Female',
  Divers: 'Divers',
};

const RadioButtonLabels = [
  'completely disagree',
  'largely disagree',
  'slightly disagree',
  'slightly agree',
  'largely agree',
  'completely agree',
];

const AtiQuestionnaireForm = () => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    gender: undefined,
    age: undefined,
    professionalBackground: undefined,
    ATI1: undefined,
    ATI2: undefined,
    ATI3: undefined,
    ATI4: undefined,
    ATI5: undefined,
    ATI6: undefined,
    ATI7: undefined,
    ATI8: undefined,
    ATI9: undefined,
  });

  const handleSubmit = (event) => {
    if (event.currentTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.currentTarget.checkValidity() === true) {
      event.preventDefault();
      createAtiQuestionnaire(form)
        .then(() => {
          console.log('redirect');
          <Redirect to="/" push />;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error saving device', error);
        });
    }

    setValidated(true);
  };

  const handleChangeString = (e) => {
    if (e.target.value) {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: undefined });
    }
  };

  const handleChangeNumber = (e) => {
    if (e.target.value) {
      setForm({ ...form, [e.target.name]: Number(e.target.value) });
    } else {
      setForm({ ...form, [e.target.name]: undefined });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h4>General Questions</h4>
      <Form.Row>
        <Form.Group as={Col} controlId="formFieldGender">
          <Form.Label>
            Gender <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            as="select"
            type="text"
            defaultValue=""
            name="gender"
            onChange={handleChangeString}
            placeholder="Select your gender."
            required
          >
            <option disabled value="">
              -- select an option --
            </option>
            {Object.keys(Gender).map((value, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">Select your gender.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formFieldAge">
          <Form.Label>
            Age <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            type="number"
            defaultValue=""
            name="age"
            onChange={handleChangeNumber}
            placeholder="Enter your age."
            min={1}
            max={120}
            required
          />
          <Form.Control.Feedback type="invalid">Provide your age.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formFieldProfessionalBackground">
          <Form.Label>
            Professional Background <div style={{ color: 'red', display: 'inline' }}>*</div>
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue=""
            name="professionalBackground"
            onChange={handleChangeString}
            placeholder="Enter your Professional Background."
            required
          />
          <Form.Control.Feedback type="invalid">
            Enter your professional background (e.g. seller, advisor, softwaredeveloper)
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <h4 style={{ marginTop: '50px' }}>Affinity for Technology Interaction Scale</h4>
      <p>
        The 9-item affinity for technology interaction (ATI) scale is designed to assess a person’s
        tendency to actively engage in intensive technology interaction — or to avoid it.
      </p>
      {atiQuestions.map((question, i) => (
        <div key={question} style={{ marginTop: '50px' }}>
          <div>
            <strong>{question}</strong>
            <div style={{ color: 'red', display: 'inline' }}>*</div>
          </div>
          {RadioButtonLabels.map((label, j) => (
            <Form.Check
              style={{ color: 'darkgray' }}
              key={label}
              type="radio"
              inline
              label={label}
              name={`ATI${i + 1}`}
              value={j + 1}
              onChange={handleChangeNumber}
              required
            />
          ))}
        </div>
      ))}
      <Button variant="primary" type="submit" style={{ float: 'right', margin: '80px 0px' }}>
        Submit
      </Button>
    </Form>
  );
};

export default AtiQuestionnaireForm;
