import React, { useState } from 'react';
import { Container, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/pagelayout';
import BackBar from '../components/backbar';
import { accessElf } from '../utils/accessElf';

const Properties = () => {
  const { properties, saveProperties } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  accessElf.track("Properties");

  const handleEdit = (property) => {
    setEditingId(property.id);
    setEditedValues(property);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({});
    setError('');
  };

  const handleChange = (value) => {
    setEditedValues(prev => ({
      ...prev,
      value: value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedProperties = properties.map(prop => 
        prop.id === editingId ? editedValues : prop
      );
      
      await saveProperties(updatedProperties);
      setSuccess('Property updated successfully!');
      setEditingId(null);
      setEditedValues({});
    } catch (err) {
      console.error('Error saving property:', err);
      setError('Failed to save property. Please try again.');
    }
  };

  return (
    <PageLayout>
      <BackBar />
      <Card>
        <Card.Body>
          <h2 className="mb-4">Properties</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" onClose={() => setSuccess('')} dismissible>
              {success}
            </Alert>
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>
                    {editingId === property.id ? (
                      <Form.Control
                        type="text"
                        value={editedValues.value || ''}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    ) : (
                      property.value
                    )}
                  </td>
                  <td>
                    {editingId === property.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(property)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card></PageLayout>
  );
};

export default Properties;
