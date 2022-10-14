import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { fetchConsentForm } from './questionnaire/consentFormView/ConsentFormViewServices';
import { ConsentForm } from '../models';
import { checkUserIsGroupMemberOf, getUserID } from './AuthService';
import ConsentFormView from './questionnaire/consentFormView/ConsentFormView';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [consentForm, setConsentForm] = useState({});
  const [userID, setUserID] = useState();

  useEffect(() => {
    getUserID().then((res) => {
      setUserID(res.username);
    });

    checkUserIsGroupMemberOf('admin').then((res) => {
      setIsAdmin(res);
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

  const handleClearDatastore = async () => {
    await DataStore.clear();
  };

  const StudyInformation = () => (
    <>
      <Alert variant="primary">AWS UserID: {userID}</Alert>
      <Jumbotron>
        <h1>IoT-Dashboard study</h1>
        <h2>Description</h2>
        The study is being conducted as part of a master&apos;s thesis to find out how users feel
        about the security and privacy of IoT devices in their own homes. The study will examine the
        usefulness of a dashboard explicitly designed for this purpose. Most people tend to acquire
        new IoT devices to build a smart home. In the process, the aspects of security and privacy
        often get pushed into the background. Either the user does not know about the different
        settings or it is accepted as it is that there are possible security gaps.
        <h2>Timeline</h2>
        The study duration is two weeks in total, divided into two equal blocks of one week each. At
        the beginning of the study, the first week is all about using a digital list. All IoT
        devices used in your home must be added to the list. A distinction is made between different
        types of devices, such as voice assistants or thermostats. After the first week, you will
        receive a questionnaire to fill out. In the following week, you will be assigned to one of
        two groups. You will be asked to use a dashboard to manage your IoT devices. This phase is
        also followed by a questionnaire. This system is based on a prototypical implementation that
        still involves manual interventions. Once you specify your IoT devices, we check public
        vulnerability databases for corresponding information.
        <br />
        <br />
        When we find related security or privacy information, an IoT security researcher is tasked
        with the interpretation of that technical information to provide recommendations to you. As
        this is still a highly manual process, we cannot guarantee processing of device security and
        privacy information within a given time frame. In fact, we are likely going to distribute
        information over the course of the entire four weeks. Limitations description While we
        understand that users of this system would prefer fully automated and quickly responding
        systems, we want to stress that this study’s goal is to contribute to the development of
        such future systems and understanding the usefulness of these manually processed
        interpretations will be key in doing so.
      </Jumbotron>
      <Alert variant="info">
        For further information, please contact:{' '}
        <a href="mailto:alexander.hiesinger@campus.lmu.de?subject=IoT-Dashboard%20study">
          alexander.hiesinger@campus.lmu.de
        </a>
      </Alert>
      {isAdmin && (
        <Button type="button" onClick={handleClearDatastore}>
          Clear Datastore
        </Button>
      )}
    </>
  );

  return (
    <>
      {consentForm && <StudyInformation />}
      {!consentForm && <ConsentFormView />}
    </>
  );
};

export default Home;
