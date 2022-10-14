import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { fetchDashboards, deleteDashboard } from './DashboardServices';

import { Dashboard } from '../../models';
import DashboardListItem from './DashboardListItem';
import DashboardForm from './DashboardForm';

const DashboardMainView = () => {
  const [dashboards, setDashboards] = useState([]);
  const [showDashboardForm, setShowDashboardForm] = useState(false);

  useEffect(() => {
    fetchDashboards().then((res) => {
      setDashboards(res);
    });

    const subscription = DataStore.observe(Dashboard).subscribe(() => {
      fetchDashboards().then((res) => {
        setDashboards(res);
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleShowDashboardForm = () => setShowDashboardForm(true);

  const handleHideDashboardForm = () => setShowDashboardForm(false);

  return (
    <>
      {showDashboardForm && <DashboardForm onCancel={handleHideDashboardForm} />}
      {!showDashboardForm && (
        <>
          <Row>
            <Col>
              <h1>Dashboard</h1>
            </Col>
            <Col>
              {dashboards.length < 1 && (
                <Button onClick={handleShowDashboardForm} style={{ float: 'right' }}>
                  + Add New
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col />
            <Col>
              {dashboards.map((item) => (
                <DashboardListItem key={item.id} dashboard={item} onDelete={deleteDashboard} />
              ))}
            </Col>
            <Col />
          </Row>
        </>
      )}
    </>
  );
};

export default DashboardMainView;
