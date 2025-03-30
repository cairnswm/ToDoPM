import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSubscriptions } from "../context/SubscriptionsContext";
import PageLayout from "../components/pagelayout";
import { accessElf } from "../utils/accessElf";
import Payment from "./PaymentPage";
import BackBar from "../components/backbar";

const BuySubscription = () => {
  
    accessElf.track("Subscriptions/Buy")
  const { subscriptions, purchaseSubscription, loading } = useSubscriptions();
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [subscriptionItems, setSubscriptionItems] = useState([]);
  const navigate = useNavigate();

  const handleSelectSubscription = (subscription) => {
    setSelectedSubscriptions((prev) => {
      // Check if subscription is already selected
      const isSelected = prev.some((item) => item.id === subscription.id);

      if (isSelected) {
        // Remove from selection if already selected
        return prev.filter((item) => item.id !== subscription.id);
      } else {
        // Add to selection if not already selected
        return [...prev, subscription];
      }
    });
    setError("");
    setSuccess("");
  };

  const handlePurchase = () => {
    if (selectedSubscriptions.length === 0) return;

    setError("");
    setSuccess("");

    // Create subscription items for the payment page
    const items = selectedSubscriptions.flatMap((subscription) => [
      {
        id: subscription.id,
        name: subscription.name,
        item_description: subscription.description,
        price: parseFloat(subscription.price),
        quantity: 1,
        additional: JSON.stringify({ subscription: subscription.id }),
      },
    ]);

    console.log("Subscription to Purchase", items);

    setSubscriptionItems(items);
    setShowPayment(true);
  };

  const handleBackToSubscriptions = () => {
    setShowPayment(false);
  };

  const handlePaymentSuccess = async () => {
    setPurchaseLoading(true);

    try {
      let hasError = false;
      let errorMessage = "";

      // Purchase each subscription sequentially
      for (const subscription of selectedSubscriptions) {
        const result = await purchaseSubscription(subscription.id);

        if (result && result.error) {
          hasError = true;
          errorMessage = result.error;
          break;
        }
      }

      if (hasError) {
        setError(errorMessage);
        setShowPayment(false);
      } else {
        setSuccess("Subscriptions purchased successfully!");
        setTimeout(() => {
          navigate("/subscriptions");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to purchase subscriptions. Please try again.");
      console.error("Purchase error:", err);
      setShowPayment(false);
    } finally {
      setPurchaseLoading(false);
    }
  };

  if (showPayment) {
    return (
      <PageLayout>
        <Button
          variant="outline-secondary"
          className="mb-3"
          onClick={handleBackToSubscriptions}
        >
          Back to Subscription Selection
        </Button>
        <Payment
          subscriptionItems={subscriptionItems}
          onPaid={handlePaymentSuccess}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <BackBar to="/subscriptions" />
      <Card>
        <Card.Body>
          <h2 className="mb-4">Available Subscriptions</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" onClose={() => setSuccess("")} dismissible>
              {success}
            </Alert>
          )}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : subscriptions && subscriptions.length > 0 ? (
            <>
              <Row xs={1} md={2} lg={3} className="g-4 mb-4">
                {subscriptions.map((subscription) => (
                  <Col key={subscription.id}>
                    <Card
                      className={`h-100 ${
                        selectedSubscriptions.some(
                          (item) => item.id === subscription.id
                        )
                          ? "border-primary"
                          : ""
                      }`}
                      onClick={() => handleSelectSubscription(subscription)}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body>
                        <Card.Title>{subscription.name}</Card.Title>
                        <Card.Text>
                          <strong>Price:</strong>{" "}
                          {subscription.price_formatted ||
                            `${subscription.currency} ${subscription.price}`}
                          <br />
                          <strong>Duration:</strong>{" "}
                          {subscription.duration_days} days
                          <br />
                          {subscription.description && (
                            <>
                              <strong>Description:</strong>{" "}
                              {subscription.description}
                            </>
                          )}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-transparent">
                        <Button
                          variant={
                            selectedSubscriptions.some(
                              (item) => item.id === subscription.id
                            )
                              ? "primary"
                              : "outline-primary"
                          }
                          className="w-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSubscription(subscription);
                          }}
                        >
                          {selectedSubscriptions.some(
                            (item) => item.id === subscription.id
                          )
                            ? "Selected"
                            : "Select"}
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/subscriptions")}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  disabled={
                    selectedSubscriptions.length === 0 || purchaseLoading
                  }
                  onClick={handlePurchase}
                >
                  {purchaseLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : (
                    `Purchase ${
                      selectedSubscriptions.length > 1
                        ? "Subscriptions"
                        : "Subscription"
                    }`
                  )}
                </Button>
              </div>
            </>
          ) : (
            <Alert variant="info">
              No subscriptions are currently available. Please check back later.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default BuySubscription;
