import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLayout from "../components/pagelayout";
import BackBar from "../components/backbar";
import { accessElf } from "../utils/accessElf";

const SubscriptionsReturn = () => {
  accessElf.track("subscriptions/return", "return");
  return (
    <PageLayout>
      <BackBar />
      <Card>
        <Card.Header>Thank you for your Payment</Card.Header>
        <Card.Body>
          Your subscription will be loaded as soon as we receive your payment.
        </Card.Body>
        <Card.Body>
          <div className="text-center mt-3">
            <Link to="/subscriptions">Return to Subscriptions</Link>
          </div>
          <div className="text-center mt-3">
            <Link to="/home">Return to Home</Link>
          </div>
        </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default SubscriptionsReturn;
