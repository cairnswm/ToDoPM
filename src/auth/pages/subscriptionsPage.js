import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionsContext';
import { useAuth } from '../context/AuthContext';
import SubscriptionsTable from '../components/subscriptions/subscriptionstable';
import CreditsTable from '../components/subscriptions/creditstable';
import PageLayout from '../components/pagelayout';
import BackBar from '../components/backbar';
import { accessElf } from '../utils/accessElf';

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const subscriptionsContext = useSubscriptions();
  const { userSubscriptions = [], userCredits = [], loading = false } = subscriptionsContext || {};
  const { properties = [] } = useAuth();

  accessElf.track("Subscriptions")

  const handleBuyClick = () => {
    navigate('/subscriptions/buy');
  };

  return (
    <PageLayout>
      <BackBar />
      <Card>
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 className="mb-0">Your Subscriptions</h2>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleBuyClick}>Buy</Button>
            </Col>
          </Row>
          <SubscriptionsTable subscriptions={userSubscriptions} loading={loading} />
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <h2 className="mb-4">Your Credits</h2>
          <CreditsTable credits={userCredits} loading={loading} />
        </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default SubscriptionsPage;
