import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { render } from '@testing-library/react';
import DeletePopup from '../DeletePopup';

import { Dashboard } from '../../models';

const DashboardListItem = ({ dashboard, onDelete }) => {
  const handleDeletePopup = () => {
    render(<DeletePopup id={dashboard.id} name={dashboard.name} onDelete={onDelete} />);
  };

  // eslint-disable-next-line no-unused-vars
  const DashboardInformation = () => (
    <>
      <Card.Text>
        Dashboard Matrix: {dashboard.dashboardRow} x {dashboard.dashboardCol}
      </Card.Text>
      <Card.Text>
        Board Matrix: {dashboard.boardRow} x {dashboard.boardCol}
      </Card.Text>
    </>
  );

  return (
    <Card border="dark" style={{ width: '18rem', marginTop: '10px' }}>
      <Card.Header>
        <h4>{dashboard.name}</h4>
      </Card.Header>
      <Card.Body>
        <Button variant="primary" href={`/dashboard/${dashboard.id}`}>
          Open
        </Button>
        <Button variant="outline-danger" onClick={handleDeletePopup} style={{ float: 'right' }}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

DashboardListItem.propTypes = {
  dashboard: PropTypes.instanceOf(Dashboard),
  onDelete: PropTypes.func,
};

export default DashboardListItem;
