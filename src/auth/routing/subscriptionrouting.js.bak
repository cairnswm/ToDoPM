import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Subscriptions from "../pages/subscriptionsPage";
import BuySubscription from "../pages/subscriptionBuyPage";
import { SubscriptionsProvider } from "../context/SubscriptionsContext";

const SubscriptionRouting = () => {
  const location = useLocation();
  const path = location.pathname.replace("/subscriptions", "");

  return (
    <SubscriptionsProvider
      onError={(message, error) => console.error(message, error)}
    >
      <ProtectedRoute>
        {path === "" && <Subscriptions />}
        {path === "/buy" && <BuySubscription />}
      </ProtectedRoute>
    </SubscriptionsProvider>
  );
};

export default SubscriptionRouting;
