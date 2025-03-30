import React, { createContext, useState, useEffect, useContext } from "react";
import { useTenant } from "../../auth/hooks/useTenant";
import { useAuth } from "../../auth/context/AuthContext";
import { combineUrlAndPath } from "../../auth/utils/combineUrlAndPath";
import { REACT_APP_SUBSCRIPTIONS_API } from "../../env";

const SummaryContext = createContext(null);

export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (context === undefined) {
    throw new Error("useSummary must be used within a SummaryProvider");
  }
  return context;
};

const SummaryProvider = ({ children, onError }) => {
  const { tenant } = useTenant();
  const { token } = useAuth();
  const [activeSubscription, setActiveSubscription] = useState(null);

  const fetchActiveSubscription = async () => {
    if (!tenant || !token) return;

    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_SUBSCRIPTIONS_API, "api.php/active"),
        {
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );
      const data = await response.json();
      const active = data.find((item) => item.hasActiveSubscription);
      setActiveSubscription(active || null);
    } catch (err) {
      if (onError) {
        onError("Summary: Unable to fetch active subscription", err);
      }
    }
  };

  useEffect(() => {
    fetchActiveSubscription();
  }, [tenant, token]);

  const isPremium = !!activeSubscription;

  return (
    <SummaryContext.Provider value={{ isPremium, activeSubscription }}>
      {children}
    </SummaryContext.Provider>
  );
};

export { SummaryContext, SummaryProvider };
