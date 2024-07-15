// src/components/RunnerComponent.js
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'
import { getRunner } from '../services/RunnerService';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

const RunnerDetailsComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    const fetchRunner = async () => {
      setLoading(true);
      const runnerData = await getRunner(id);
      if (runnerData.data) {
        setFirstName(runnerData.data.firstName);
        setLastName(runnerData.data.lastName);
        setEmail(runnerData.data.email);
      } else {
        setError('Failed to fetch runner data. Please try again later.');
      }
      setLoading(false);
    };

    fetchRunner();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Runner Details</Card.Header>
        <Card.Body>
          {firstName && lastName && email ? (
            <div>
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
            </div>
          ) : (
            <p>No runner data available.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RunnerDetailsComponent;
