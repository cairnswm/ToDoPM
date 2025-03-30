import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { useTenant } from "../hooks/useTenant";
import { useAuth } from "./AuthContext";
import { combineUrlAndPath } from "../utils/combineUrlAndPath";
import { REACT_APP_SUBSCRIPTIONS_API, REACT_APP_PAYWEB3_API } from "../../env";

const SubscriptionsContext = createContext(null);

export const useSubscriptions = () => {
  const context = useContext(SubscriptionsContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptions must be used within a SubscriptionsProvider"
    );
  }
  return context;
};

const SubscriptionsProvider = (props) => {
  const { children, onError } = props;
  const { tenant } = useTenant();
  const { user, token } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [userCredits, setUserCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    if (!tenant) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(
          REACT_APP_SUBSCRIPTIONS_API,
          "api.php/subscriptions/"
        ),
        {
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      if (onError) {
        onError("Subscriptions: Unable to fetch subscriptions", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSubscriptions = async () => {
    if (!tenant || !user?.id || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(
          REACT_APP_SUBSCRIPTIONS_API,
          `api.php/user/${user.id}/subscriptions`
        ),
        {
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      setUserSubscriptions(data);
    } catch (err) {
      if (onError) {
        onError("Subscriptions: Unable to fetch user subscriptions", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCredits = async () => {
    if (!tenant || !user?.id || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(
          REACT_APP_SUBSCRIPTIONS_API,
          `api.php/user/${user.id}/credits`
        ),
        {
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      setUserCredits(data);
    } catch (err) {
      if (onError) {
        onError("Subscriptions: Unable to fetch user credits", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const purchaseSubscription = async (subscriptionId) => {
    if (!tenant || !user?.id || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(
          REACT_APP_SUBSCRIPTIONS_API,
          `api.php/user/${user.id}/subscription`
        ),
        {
          body: JSON.stringify({ subscription_id: subscriptionId }),
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );
      const data = await response.json();
      await fetchUserSubscriptions();
      await fetchUserCredits();
      return data;
    } catch (err) {
      if (onError) {
        onError("Subscriptions: Unable to purchase subscription", err);
      }
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const useCredits = async (amount) => {
    if (!tenant || !user?.id || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(
          REACT_APP_SUBSCRIPTIONS_API,
          `api.php/user/${user.id}/credits/use`
        ),
        {
          body: JSON.stringify({ amount }),
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );
      const data = await response.json();
      await fetchUserCredits();
      return data;
    } catch (err) {
      if (onError) {
        onError("Subscriptions: Unable to use credits", err);
      }
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (subscriptionItems) => {
    if (!tenant || !token) return;

    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_SUBSCRIPTIONS_API, `createorder.php`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            APP_ID: tenant,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_details: "Subscription",
            status: "pending",
            currency: "ZAR",
            items: subscriptionItems.map((item) => ({
              item_type_id: 5,
              parent_id: null,
              item_id: item.id,
              title: item.name,
              item_description: item.description,
              price: item.price,
              quantity: item.quantity,
              additional: JSON.stringify({ subscription: item.subscription }),
            })),
          }),
        }
      );

      const order = await response.json();
      return order;
    } catch (err) {
      if (onError) {
        onError("Subscriptions: Unable to create order", err);
      }
      return { error: err.message };
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [tenant]);

  useEffect(() => {
    if (user?.id && token) {
      fetchUserSubscriptions();
      fetchUserCredits();
    }
  }, [user, token, tenant]);

  const getUserCreditValue = (name) => {
    const credit = userCredits.find((c) => c.name === name);
    return credit ? parseInt(credit.value, 10) : 0;
  };

  const hasActiveSubscription = () => {
    return userSubscriptions.length > 0;
  };

  const values = useMemo(
    () => ({
      subscriptions,
      userSubscriptions,
      userCredits,
      loading,
      fetchSubscriptions,
      fetchUserSubscriptions,
      fetchUserCredits,
      purchaseSubscription,
      useCredits,
      getUserCreditValue,
      hasActiveSubscription,
      createOrder,
    }),
    [subscriptions, userSubscriptions, userCredits, loading, createOrder]
  );

  if (!REACT_APP_SUBSCRIPTIONS_API) {
    return (
      <div>
        <h1>Missing Configuration</h1>
        <p>
          Set the REACT_APP_SUBSCRIPTIONS_API environment variable to the URL of
          the subscriptions API
        </p>
      </div>
    );
  }

  return (
    <SubscriptionsContext.Provider value={values}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

export { SubscriptionsContext, SubscriptionsProvider };
