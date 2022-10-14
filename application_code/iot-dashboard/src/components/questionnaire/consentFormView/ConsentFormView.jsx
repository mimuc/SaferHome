import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { createConsentForm } from './ConsentFormViewServices';

const ConsentForm = () => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    accepted: false,
  });

  const handleSubmit = (event) => {
    if (event.currentTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.currentTarget.checkValidity() === true) {
      event.preventDefault();
      createConsentForm(form)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Succesfully accepted consent form.');
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error saving consent form', error);
        });
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Jumbotron>
        <h2>Consent for participation in a research study</h2>
        <p>
          I agree to participate in a research project conducted by Alexander Hiesinger as principal
          investigator (PI). I understand that the project is designed to study awareness and risk
          communication around security and privacy of Internet of Things (IoT) devices. My
          participation in this study is expected to last around 20 days.
        </p>
        <p>
          <strong>1.</strong> My participation in this study is voluntary. I may discontinue
          participation at any time without penalty. No one will be informed of my withdrawal. In
          case of withdrawal, I have been informed that all data gathered throughout the study will
          immediately be deleted or destroyed.
        </p>
        <p>
          <strong>2.</strong> I agree to be audiotaped in interviews that will happen at different
          stages in this study. I will be informed about recordings beforehand. I understand that
          the recordings will be transcribed. I was informed that the recordings and the
          transcriptions may only be accessed by the PI, possibly a professional transcription
          service, and the colleagues, with whom the PI collaborates in this research.
        </p>
        <p>
          <strong>3.</strong> I have the right to refuse to answer any questions and to refuse
          executing any actions that I was asked to perform.
        </p>
        <p>
          <strong>4.</strong> I am aware that the information I provide might be used and possibly
          be quoted in a publication. I understand that I will not be identified by name in any case
          and that my participation in this study will remain confidential at any time.
        </p>
        <p>
          <strong>5.</strong> I understand that providing selected demographic data strengthens the
          publication and its claims. While I will remain completely anonymous, I agree that the
          following information about me are listed in the publication: professional background,
          gender, and age (within a range of 5 years, e.g. “25 - 29 years old”).
        </p>
        <p>
          <strong>6.</strong> I understand that all data will be stored on a server provided by
          Amazon Web Services, located in Germany. Besides data that I entire myself, this includes
          metadata related to my interaction with the system (e.g. access date and time). Access to
          the database is restricted to the PI.
        </p>
        <p>
          <strong>7.</strong> I understand that the system is of a prototypical nature. Further, I
          understand that all assessments provided to me are based on a manual process involving the
          PI and additional IT security experts. Given the prototypical nature of the system and the
          manual assessments, I recognize that provided information related to my devices might not
          be complete. Rather, the system provides an initial set of assessments that can help to
          reflect about my IoT devices. I understand that I should not solely trust devices based on
          positive ratings of the system, as the system’s information might be incomplete.
        </p>
      </Jumbotron>
      <Alert variant="info">
        For further information, please contact:{' '}
        <a href="mailto:alexander.hiesinger@campus.lmu.de?subject=IoT-Dashboard%20study">
          alexander.hiesinger@campus.lmu.de
        </a>
      </Alert>

      <Form.Group controlId="formAcceptCheckbox">
        <Form.Check
          type="checkbox"
          name="accepted"
          value={form.accepted}
          onChange={(e) => setForm({ ...form, [e.target.name]: Boolean(e.target.value) })}
          label="I have read and understood the statements and explanations of this
        document. All my questions have been answered to my satisfaction, and I voluntarily agree to
        participate in this study."
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" style={{ float: 'right' }}>
        Accept
      </Button>
    </Form>
  );
};

export default ConsentForm;
