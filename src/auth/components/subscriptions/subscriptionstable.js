import React from 'react';
import { Table, Badge, Alert } from 'react-bootstrap';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const SubscriptionsTable = ({ subscriptions, loading }) => {
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Alert variant="info">
        You don't have any active subscriptions. Visit our payment page to subscribe to our services.
      </Alert>
    );
  }
  
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Subscription Name</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((subscription, index) => (
          <tr key={index}>
            <td>{subscription.name}</td>
            <td>
              <Badge bg={subscription.active ? 'success' : 'danger'}>
                {subscription.active ? 'Active' : 'Inactive'}
              </Badge>
            </td>
            <td>{formatDate(subscription.start_date)}</td>
            <td>{formatDate(subscription.expiry_date)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubscriptionsTable;
