/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';

import DashboardMainView from './components/dashboard/DashboardMainView';
import DeviceMainView from './components/device/DeviceMainView';
import Editor from './components/dashboard/editor/Editor';
import Home from './components/Home';

import QuestionnaireForm from './components/questionnaire/affinityForTechnologyInteraction/AtiQuestionnaireForm';

const App = () => (
  <Router>
    <NavBar />
    <Container style={{ marginTop: '50px', marginBottom: '100px' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard/:id" component={Editor} />
        <Route path="/dashboard" component={DashboardMainView} />
        <Route path="/device" component={DeviceMainView} />
        <Route path="/affinityForTechnologyInteraction" component={QuestionnaireForm} />
      </Switch>
    </Container>
  </Router>
);

export default withAuthenticator(App);
