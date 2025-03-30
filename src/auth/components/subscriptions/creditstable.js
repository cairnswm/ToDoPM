import React from 'react';
import { Table, Alert } from 'react-bootstrap';

const CreditsTable = ({ credits, loading }) => {
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!credits || credits.length === 0) {
    return (
      <Alert variant="info">
        You don't have any credits.
      </Alert>
    );
  }
  
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Credit Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {credits.map((credit, index) => (
          <tr key={index}>
            <td>{credit.name}</td>
            <td>{credit.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CreditsTable;
