import React, { useState, useEffect } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ConsentForm } from '../models';

import { checkUserIsGroupMemberOf } from './AuthService';
import { fetchConsentForm } from './questionnaire/consentFormView/ConsentFormViewServices';

const NavBar = () => {
  const [isMemberOfDevice, setIsMemberOfDevice] = useState(false);
  const [isMemberOfDashboard, setIsMemberOfDashboard] = useState(false);
  const [consentForm, setConsentForm] = useState({});

  useEffect(() => {
    checkUserIsGroupMemberOf('dashboard').then((res) => {
      setIsMemberOfDashboard(res);
    });
    checkUserIsGroupMemberOf('device').then((res) => {
      setIsMemberOfDevice(res);
    });
    fetchConsentForm().then((res) => {
      setConsentForm(res[0]);
    });

    const subscription = DataStore.observe(ConsentForm).subscribe(() => {
      fetchConsentForm().then((res) => {
        setConsentForm(res[0]);
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">IoT Dashboard</Navbar.Brand>
      <Navbar.Toggle />
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {isMemberOfDashboard && consentForm && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
        {isMemberOfDevice && consentForm && <Nav.Link href="/device">Device</Nav.Link>}
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AmplifySignOut />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
